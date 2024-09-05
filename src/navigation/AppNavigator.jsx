import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  ThemeDark,
  ThemeLight,
  ThemeDarkNavigation,
  ThemeLightNavigation,
} from "../config/theme";
import { useTheme } from "../contexts/ThemeContexts";
import { Provider } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import SkNewsScreen from "../screens/SkNewsScreen";
import SobreScreen from "../screens/SobreScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SkStudyScreen from "../screens/SkStudyScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isDarkTheme } = useTheme();

  const theme = isDarkTheme ? ThemeDark : ThemeLight;
  const themeNavigation = isDarkTheme
    ? ThemeDarkNavigation
    : ThemeLightNavigation;

  return (
    <Provider theme={theme}>
      <NavigationContainer theme={themeNavigation}>
        <Stack.Navigator
           screenOptions={{
              headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
            }}
          />
          <Stack.Screen
            name="News"
            component={SkNewsScreen}
            options={{
              headerShown: false, // Oculta o cabeçalho superior
            }}
          />
          <Stack.Screen
            name="Sobre"
            component={SobreScreen}
            options={{
              headerShown: false, // Oculta o cabeçalho superior
            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
             
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false, // Oculta o cabeçalho superior
            }}
          />
          <Stack.Screen
            name="Study"
            component={SkStudyScreen}
            options={{
              headerShown: false, // Oculta o cabeçalho superior
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Tabs = createMaterialBottomTabNavigator();

export function TabsNavigation() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={TabsNavigation} />
    </Tabs.Navigator>
  );
}
