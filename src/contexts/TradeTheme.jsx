import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContexts";
import { Button } from "react-native-paper";

export default function TradeTheme() {
    const { tradeTheme } = useContext(ThemeContext)
    return <Button onPress={tradeTheme}>Trocar Tema</Button>
}