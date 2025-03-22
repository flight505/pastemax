import React, { useEffect, useState } from 'react';
import { Theme } from '../types';
import { ThemeContext } from './theme';

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get saved theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);

    // Apply theme class to document
    const root = window.document.documentElement;
    root.classList.remove('light-mode', 'dark-mode');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(`${systemTheme}-mode`);
    } else {
      root.classList.add(`${theme}-mode`);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light-mode', 'dark-mode');
        root.classList.add(`${mediaQuery.matches ? 'dark' : 'light'}-mode`);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 