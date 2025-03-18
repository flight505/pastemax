import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "./ui";
import styles from "./ThemeToggle.module.css";

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
      const background = document.querySelector(`.${styles.themeSegmentsBackground}`);
      if (background) {
        background.classList.add(styles.animated);
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.themeSegmentedControl}>
      <div 
        className={`${styles.themeSegmentsBackground} ${styles[theme]}`} 
        data-state={theme}
      />
      {themes.map(({ key, icon: Icon, title }) => (
        <Button
          key={key}
          variant="ghost"
          size="sm"
          iconOnly
          startIcon={<Icon size={16} strokeWidth={1.5} />}
          onClick={() => setTheme(key as "light" | "dark" | "system")}
          title={title}
          className={`${styles.themeSegment} ${theme === key ? styles.active : ""}`}
        />
      ))}
    </div>
  );
};

export default ThemeToggle; 