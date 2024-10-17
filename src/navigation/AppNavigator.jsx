import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  ThemeDark,
  ThemeLight,
  ThemeDarkNavigation,
  ThemeLightNavigation,
} from "../config/theme";
import { useTheme } from "../contexts/ThemeContexts";
import { Provider, Switch, Avatar, Title, Button } from "react-native-paper";
import { View } from "react-native";
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
import ProfileScreen from "../screens/ProfileScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import TermosScreen from "../screens/PrivacidadeScreen";
import PrivacidadeScreen from "../screens/TermosScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: theme.colors.text,
        drawerStyle: {
          backgroundColor: theme.colors.background,
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
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      {/* Avatar e Nome do Usuário */}
      <View style={{ padding: 20, alignItems: "center" }}>
        <Avatar.Image
          size={80}
          source={{ uri: "https://example.com/profile-image.jpg" }} // Substitua com a URL da imagem do usuário
        />
        <Title style={{ marginTop: 10 }}>Nome do Usuário</Title>
        <Button
          onPress={() => props.navigation.navigate("Profile")}
          mode="contained"
          style={{ marginTop: 10 }}
        >
          Ver Perfil
        </Button>
      </View>

      {/* Lista de itens do Drawer */}
      <DrawerItemList {...props} />

      {/* Switch para alternar o tema */}
      <View style={{ padding: 20 }}>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
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
