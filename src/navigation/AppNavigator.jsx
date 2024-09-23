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

// Criação do Stack e Drawer
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Função para o DrawerNavigator
function DrawerNavigator() {
  const { isDarkTheme } = useTheme();
  const dimensions = useWindowDimensions();

  const theme = isDarkTheme ? ThemeDark : ThemeLight;
  const isWeb = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: isWeb ? "permanent" : "front",
        swipeEnabled: !isWeb,
        headerTitle: "", // Remove o título
        headerTransparent: true, // Deixa o fundo do header transparente
        headerTintColor: theme.colors.text, // Muda a cor do ícone do menu
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerContentStyle: {
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
      <Drawer.Screen name="Seek" component={SeekScreen} />
      <Drawer.Screen name="News" component={SkNewsScreen} />
      <Drawer.Screen name="Study" component={SkStudyScreen} />
      <Drawer.Screen name="ConfirmaSenSeek" component={ConfirmaSenSeek} />
      <Drawer.Screen name="Sobre" component={SobreScreen} />
      <Drawer.Screen name="ApiTest" component={ApiScreenTest} />
    </Drawer.Navigator>
  );
}
//FeedBack, Sobre e API SCREEN para fazer(problema não é mais meu se fodam, a não ser que tenha erro) <3 NÃO ERREM

// Função principal de navegação, onde o Drawer é filho do Stack
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
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="SenhaSeek" component={SenhaSeek} />
          <Stack.Screen name="App" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
