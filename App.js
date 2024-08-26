import { MD3LightTheme, Provider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";

import { themeDark, themeLight } from "./src/config/theme";
import { useColorScheme } from "react-native";

export default function App() {
  const colorScheme = useColorScheme();
  console.log(colorScheme);

  const isDarkMode = colorScheme === "dark";

  const theme = isDarkMode ? themeDark : themeLight;

  return (
    <Provider theme={theme}>
      {/* {} */}
      <AppNavigator />
    </Provider>
  );
}