import React, { useContext } from "react";
import { Button } from "react-native-paper";
import styles from "../config/styles";
import { ThemeContext } from "./ThemeContexts";

export default function TradeTheme() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
      <Button mode="contained" onPress={toggleTheme} style={styles.button}>
        {isDarkTheme ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
      </Button>
  );
}
