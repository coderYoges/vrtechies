import { createContext, useContext, useEffect, useState } from "react";
import { COLOR_PALLETES } from "../config";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorIndex, setColorIndex] = useState(0);

  // Rotate theme
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % COLOR_PALLETES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Apply CSS variables
  useEffect(() => {
    const theme = COLOR_PALLETES[colorIndex];

    document.documentElement.style.setProperty(
      "--color-primary",
      theme.primary,
    );
    document.documentElement.style.setProperty("--color-hover", theme.hover);
    document.documentElement.style.setProperty("--color-text", theme.text);
  }, [colorIndex]);

  return (
    <ThemeContext.Provider
      value={{
        colorIndex,
        theme: COLOR_PALLETES[colorIndex],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
