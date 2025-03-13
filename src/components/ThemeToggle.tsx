import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";

const themes = [
  {
    key: "light",
    icon: Sun,
    title: "Light Mode"
  },
  {
    key: "dark",
    icon: Moon,
    title: "Dark Mode"
  },
  {
    key: "system",
    icon: Monitor,
    title: "Use System Settings"
  }
];

const ThemeToggle = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  
  // Add animation class after initial render to enable transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      const background = document.querySelector(".theme-segments-background");
      if (background) {
        background.classList.add("animated");
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="theme-segmented-control">
      <div 
        className={`theme-segments-background ${theme}`} 
        data-state={theme}
      />
      {themes.map(({ key, icon: Icon, title }) => (
        <button
          key={key}
          className={`theme-segment ${theme === key ? "active" : ""}`}
          onClick={() => setTheme(key as "light" | "dark" | "system")}
          title={title}
        >
          <Icon size={16} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle; 