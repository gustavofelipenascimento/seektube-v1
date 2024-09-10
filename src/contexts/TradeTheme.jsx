import React, { useContext } from "react";
import { Button } from "react-native-paper";
import styles from "../config/styles";
import { ThemeContext } from "./ThemeContexts";

export default function TradeTheme() {
  const { tradeTheme } = useContext(ThemeContext);

  return (
    <Button
      mode="contained"
      style={styles.button}
      onPress={
        tradeTheme ||
        (() => console.warn("tradeTheme function is not available"))
      }
      accessibilityLabel="Toggle theme"
    >
      Trocar Tema
    </Button>
  );
}
