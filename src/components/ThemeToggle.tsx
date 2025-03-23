import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Monitor } from 'lucide-react';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Add animation class after initial render
    const timer = setTimeout(() => setIsAnimated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.themeSegmentedControl}>
      <div
        className={`${styles.themeSegmentsBackground} ${styles[theme]} ${
          isAnimated ? styles.animated : ''
        }`}
      />
      <button
        className={`${styles.themeSegment} ${theme === 'light' ? styles.active : ''}`}
        onClick={() => setTheme('light')}
        title="Light theme"
      >
        <Sun size={16} />
      </button>
      <button
        className={`${styles.themeSegment} ${theme === 'dark' ? styles.active : ''}`}
        onClick={() => setTheme('dark')}
        title="Dark theme"
      >
        <Moon size={16} />
      </button>
      <button
        className={`${styles.themeSegment} ${theme === 'system' ? styles.active : ''}`}
        onClick={() => setTheme('system')}
        title="System theme"
      >
        <Monitor size={16} />
      </button>
    </div>
  );
};

export default ThemeToggle; 