import { createContext } from 'react';
import { Theme } from '../types';

// Create and export the theme context
export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'system',
  setTheme: () => {},
}); 