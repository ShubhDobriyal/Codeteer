import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDark: false,
  themeToggle: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  let currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (localStorage.getItem("dark")) {
    currentTheme = JSON.parse(localStorage.getItem("dark"));
  }

  const [isDark, setIsDark] = useState(currentTheme || false);

  const themeToggle = () => {
    setIsDark((theme) => !theme);
  };

  useEffect(() => {
    localStorage.setItem("dark", isDark);
  }, [isDark]);

  const themeContextData = {
    isDark,
    themeToggle,
  };

  return (
    <ThemeContext.Provider value={themeContextData}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
