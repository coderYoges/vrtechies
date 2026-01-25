import { createContext, useContext, useEffect, useState } from 'react';
import { GLOBAL_THEMES } from '../config/constants';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorIndex, setColorIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode (Tailwind-style)
  useEffect(() => {
    const checkDark = () =>
      document.documentElement.classList.contains('dark');

    setIsDark(checkDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Rotate theme
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % GLOBAL_THEMES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Apply CSS variables
  useEffect(() => {
    const theme = GLOBAL_THEMES[colorIndex];
    const mode = isDark ? theme.dark : theme.light;

    document.documentElement.style.setProperty('--color-primary', mode.primary);
    document.documentElement.style.setProperty('--color-hover', mode.hover);
    document.documentElement.style.setProperty('--color-text', mode.text);

    // Add or remove 'dark' class on <html>
    document.documentElement.classList.toggle('dark', isDark);
  }, [colorIndex, isDark]);

  // ✅ toggleDarkMode function
  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        colorIndex,
        theme: GLOBAL_THEMES[colorIndex],
        isDark,
        toggleDarkMode, // <-- expose the toggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
