import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { storage } from "@/utils/storage";

type ColorScheme = "light" | "dark";

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

export default ColorSchemeContext;
