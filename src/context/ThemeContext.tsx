import React, { createContext, useState, useEffect, useContext } from "react";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
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

const ThemeContext = createContext(defaultThemeContext);

// Add eslint-disable comment to suppress the warning about fast refresh
 
export const STORAGE_KEY = "pastemax-theme";

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // Initialize theme from localStorage or default to "system"
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    return savedTheme && ["light", "dark", "system"].includes(savedTheme) ? savedTheme : "system";
  });
  
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  // Function to set theme and save to localStorage
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Effect to apply the correct theme based on selection or system preference
  useEffect(() => {
    const applyTheme = (themeName: "light" | "dark") => {
      setCurrentTheme(themeName);
      
      if (themeName === "dark") {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    };
    
    // Check for system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Apply theme based on selection or system preference
    if (theme === "system") {
      applyTheme(prefersDark ? "dark" : "light");
    } else {
      applyTheme(theme as "light" | "dark");
    }
    
    // Listen for system preference changes if in auto mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 