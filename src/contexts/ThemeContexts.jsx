import { createContext, useEffect, useState, useContext } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const scheme = useColorScheme();

  const [isDarkTheme, setIsDarkTheme] = useState(scheme === "dark");

  useEffect(() => {
    setIsDarkTheme(scheme === "dark");
  }, [scheme]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme: () => setIsDarkTheme(!isDarkTheme),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
