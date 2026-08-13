import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Appearance, ColorSchemeName, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { storage } from "@/utils/storage";
import { NEWCOLORS, DARK_NEWCOLORS } from "@/constants/NewTheme";
import { COLORS, DARK_COLORS } from "@/constants/Theme";

type ColorScheme = "light" | "dark";

const LIGHT_THEME = { ...NEWCOLORS, ...COLORS };
const DARK_THEME: Record<keyof typeof LIGHT_THEME, string> = {
  ...DARK_NEWCOLORS,
  ...DARK_COLORS,
};

export type Theme = Record<keyof typeof LIGHT_THEME, string>;

interface ColorSchemeContextType {
  colorScheme: ColorScheme;
  isDark: boolean;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

const STORAGE_KEY = "colorScheme";

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(
  undefined,
);

const getInitialColorScheme = (): ColorScheme => {
  const stored = storage.getString(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  const system: ColorSchemeName = Appearance.getColorScheme();
  return system === "dark" ? "dark" : "light";
};

// How long each half of the crossfade takes: fading to the solid overlay
// color, then fading back to reveal the (now-switched) real content.
const FADE_IN_MS = 200;
const FADE_OUT_MS = 280;

export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(
    getInitialColorScheme,
  );
  const [overlayColor, setOverlayColor] = useState(
    getInitialColorScheme() === "dark"
      ? DARK_THEME.backgroundColor
      : LIGHT_THEME.backgroundColor,
  );
  const overlayOpacity = useSharedValue(0);

  const commitColorScheme = (scheme: ColorScheme) => {
    storage.set(STORAGE_KEY, scheme);
    setColorSchemeState(scheme);
    overlayOpacity.value = withTiming(0, {
      duration: FADE_OUT_MS,
      easing: Easing.out(Easing.cubic),
    });
  };

  const setColorScheme = (scheme: ColorScheme) => {
    if (scheme === colorScheme) return;
    setOverlayColor(
      scheme === "dark" ? DARK_THEME.backgroundColor : LIGHT_THEME.backgroundColor,
    );
    overlayOpacity.value = withTiming(
      1,
      { duration: FADE_IN_MS, easing: Easing.in(Easing.cubic) },
      (finished) => {
        "worklet";
        if (finished) {
          runOnJS(commitColorScheme)(scheme);
        }
      },
    );
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        isDark: colorScheme === "dark",
        setColorScheme,
        toggleColorScheme,
      }}
    >
      <View style={{ flex: 1 }}>
        {children}
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: overlayColor },
            overlayStyle,
          ]}
        />
      </View>
    </ColorSchemeContext.Provider>
  );
};

const useColorSchemeContext = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error(
      "useColorScheme must be used within a ColorSchemeProvider",
    );
  }
  return context;
};

// Drop-in replacement for react-native's useColorScheme: reflects the
// app's own light/dark toggle instead of only the OS setting.
export const useColorScheme = (): ColorScheme => {
  return useColorSchemeContext().colorScheme;
};

export const useIsDarkMode = (): boolean => {
  return useColorSchemeContext().isDark;
};

export const useToggleColorScheme = () => {
  const { toggleColorScheme, setColorScheme } = useColorSchemeContext();
  return { toggleColorScheme, setColorScheme };
};

export const useTheme = (): Theme => {
  const { isDark } = useColorSchemeContext();
  return isDark ? DARK_THEME : LIGHT_THEME;
};

export default ColorSchemeContext;
