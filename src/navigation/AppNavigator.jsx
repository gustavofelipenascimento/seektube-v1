import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  ThemeDark,
  ThemeLight,
  ThemeDarkNavigation,
  ThemeLightNavigation,
} from "../config/theme";
import { useTheme } from "../contexts/ThemeContexts"; // Importando o Contexto
import { Provider } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import SkNewsScreen from "../screens/SkNewsScreen";
import SobreScreen from "../screens/SobreScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SkStudyScreen from "../screens/SkStudyScreen";
import SeekScreen from "../screens/SeekScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import ConfirmaSenSeek from "../screens/ConfirmaSenSeek";
import SenhaSeek from "../screens/SenhaSeek";
import ApiScreenTest from "../screens/ApiScreenTest";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useWindowDimensions, View, Switch } from "react-native";
import TermosScreen from "../screens/PrivacidadeScreen";
import PrivacidadeScreen from "../screens/TermosScreen";

// Criação do Stack e Drawer
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const dimensions = useWindowDimensions();

  const theme = isDarkTheme ? ThemeDark : ThemeLight;
  const isWeb = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: isWeb ? "permanent" : "front",
        swipeEnabled: !isWeb,
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: theme.colors.text,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerContentStyle: {
          paddingVertical: "75%",
          padding: "25%",
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          marginStart: 10,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Seek" component={SeekScreen} />
      <Drawer.Screen name="News" component={SkNewsScreen} />
      <Drawer.Screen name="Study" component={SkStudyScreen} />
      <Drawer.Screen name="ConfirmaSenSeek" component={ConfirmaSenSeek} />
      <Drawer.Screen name="Sobre" component={SobreScreen} />
      <Drawer.Screen name="ApiTest" component={ApiScreenTest} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View
        style={{
          padding: 20,
          position: "relative",
          top: "99%",
          alignContent: "flex-end",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
      <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkTheme ? "#757aff" : "#fff"}
          trackColor={{ false: "#767577", true: "#f4f4f4" }}
          col
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function AppNavigator() {
  const { isDarkTheme } = useTheme();
  const themeNavigation = isDarkTheme
    ? ThemeDarkNavigation
    : ThemeLightNavigation;

  return (
    <Provider theme={isDarkTheme ? ThemeDark : ThemeLight}>
      <NavigationContainer theme={themeNavigation}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="SenhaSeek"
            component={SenhaSeek}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen name="App" component={DrawerNavigator} />
          <Stack.Screen
            name="Terms"
            component={TermosScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Privas"
            component={PrivacidadeScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
