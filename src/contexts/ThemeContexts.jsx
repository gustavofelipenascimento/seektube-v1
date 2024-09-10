import { createContext, useEffect, useState, useContext } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // detecta qual é o tema do sistema
  // seja Android, IOS ou navegador
  const scheme = useColorScheme();
  // light or dark
  const [isDarkTheme, setIsDarkTheme] = useState(scheme === "dark");

  // ele vai ficar escutando a variável responsável
  // por determinar se o usuário está usando Dark ou Light
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
