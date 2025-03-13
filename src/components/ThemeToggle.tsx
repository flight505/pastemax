import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";

const ThemeToggle = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="theme-segmented-control">
      <div className="theme-segments-background" />
      <button
        className={`theme-segment ${theme === "light" ? "active" : ""}`}
        onClick={() => setTheme("light")}
        title="Light Mode"
      >
        <Sun size={18} strokeWidth={1.5} />
      </button>
      <button
        className={`theme-segment ${theme === "dark" ? "active" : ""}`}
        onClick={() => setTheme("dark")}
        title="Dark Mode"
      >
        <Moon size={18} strokeWidth={1.5} />
      </button>
      <button
        className={`theme-segment ${theme === "system" ? "active" : ""}`}
        onClick={() => setTheme("system")}
        title="Use System Settings"
      >
        <Monitor size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default ThemeToggle; 