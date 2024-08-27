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
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Home",
              tabBarIcon: "home",
            }}
          />
          <Stack.Screen
            name="News"
            component={SkNewsScreen}
            options={{
              title: "news",
              tabBarIcon: "newspaper",
            }}
          />
          <Stack.Screen
            name="Sobre"
            component={SobreScreen}
            options={{
              title: "sobre",
              tabBarIcon: "information",
            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: "contato",
              tabBarIcon: "mail",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "study",
              tabBarIcon: "book",
            }}
          />
          <Stack.Screen
            name="Perfil"
            component={SkStudyScreen}
            options={{
              title: "perfil",
              tabBarIcon: "account",
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
