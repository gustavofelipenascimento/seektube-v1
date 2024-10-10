import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./src/contexts/ThemeContexts";
import TradeTheme from "./src/contexts/TradeTheme";
import TheDrawer, { AppNavigator } from "./src/navigation/AppNavigator";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <ThemeProvider>
      <TheDrawer />
    </ThemeProvider>
  );
}


