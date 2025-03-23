import { createContext } from "react";

export type ThemeType = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: ThemeType;
  currentTheme: "light" | "dark"; // The actual applied theme
  setTheme: (theme: ThemeType) => void;
}

// Create context with proper typing
const defaultThemeContext: ThemeContextType = {
  theme: "system",
  currentTheme: "light",
  setTheme: () => {},
};

export const ThemeContext = createContext(defaultThemeContext); 