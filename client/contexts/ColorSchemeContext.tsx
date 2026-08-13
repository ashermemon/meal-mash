import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance, ColorSchemeName } from "react-native";
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

export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(
    getInitialColorScheme,
  );

  const setColorScheme = (scheme: ColorScheme) => {
    storage.set(STORAGE_KEY, scheme);
    setColorSchemeState(scheme);
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        isDark: colorScheme === "dark",
        setColorScheme,
        toggleColorScheme,
      }}
    >
      {children}
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
