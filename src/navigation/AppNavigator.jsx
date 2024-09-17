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
import SeekScreen from "../screens/SeekScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import ConfirmaSenSeek from "../screens/ConfirmaSenSeek";
import SenhaSeek from "../screens/SenhaSeek";
import ApiScreenTest from "../screens/ApiScreenTest";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";



const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="News" component={SkNewsScreen} />
      <Stack.Screen name="Sobre" component={SobreScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Study" component={SkStudyScreen} />
      <Stack.Screen name="Seek" component={SeekScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="SenhaSeek" component={SenhaSeek} />
      <Stack.Screen name="ConfirmaSenSeek" component={ConfirmaSenSeek} />
      <Stack.Screen name="ApiTest" component={ApiScreenTest} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function TheDrawer() {
  const { isDarkTheme } = useTheme();
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;

  const theme = isDarkTheme ? ThemeDark : ThemeLight;
  const themeNavigation = isDarkTheme
    ? ThemeDarkNavigation
    : ThemeLightNavigation;

  return (
    <Provider theme={theme}>
      <NavigationContainer theme={themeNavigation}
      screenOptions={{

      }}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            
            defaultStatus: "open",
            headerTransparent: true,
            drawerType: isLargeScreen ? "permanent" : "front",
            drawerStyle: isLargeScreen ? null : { width: "80%" },
            drawerContentStyle: {
              backgroundColor: theme.colors.background,
              paddingVertical: "50%",
            },
            drawerActiveTintColor: theme.colors.primary,
            drawerInactiveTintColor: theme.colors.text,
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
            },
          }}
        >
          <Drawer.Screen
            name="App"
            component={AppNavigator}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen name="Login" component={SignInScreen} />
          <Drawer.Screen name="Cadastro" component={SignUpScreen} />
          <Drawer.Screen name="Sobre" component={SobreScreen} />
          <Drawer.Screen name="Study" component={SkStudyScreen} />
          <Drawer.Screen name="Seek" component={SeekScreen} />
          <Drawer.Screen name="Feedback" component={FeedbackScreen} />
          <Drawer.Screen name="SenhaSeek" component={SenhaSeek} />
          <Drawer.Screen name="ConfirmaSenSeek" component={ConfirmaSenSeek} />
          <Drawer.Screen name="ApiTest" component={ApiScreenTest} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
