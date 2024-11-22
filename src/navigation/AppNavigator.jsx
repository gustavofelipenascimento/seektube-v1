import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Provider, Switch, Avatar, Title, Button } from "react-native-paper";
import {
  ThemeDark,
  ThemeLight,
  ThemeDarkNavigation,
  ThemeLightNavigation,
} from "../config/theme";
import { useTheme } from "../contexts/ThemeContexts";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import styles from "../config/styles";

// Importação de telas
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
import TermosScreen from "../screens/PrivacidadeScreen";
import PrivacidadeScreen from "../screens/TermosScreen";
import AlterarNomeScreen from "../screens/AlterarNomeScreen";
import AlterarEstadoScreen from "../screens/AlterarEstadoScreen";
import AlterarDataNascimentoScreen from "../screens/AlterarDtNascimentoScreen";
import AlterarEmailScreen from "../screens/AlterarEmailScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

// Configurações de navegação
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Navegador do Drawer com telas protegidas
function DrawerNavigator() {
  const { isDarkTheme } = useTheme();
  const dimensions = useWindowDimensions();
  const theme = isDarkTheme ? ThemeDark : ThemeLight;
  const isWeb = dimensions.width >= 768;

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [userName, setUserName] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setProfileImageUrl(userData.avatar);
          setUserName(userData.name);
        }
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="SeekScreen"
      screenOptions={{
        drawerType: isWeb ? "permanent" : "front",
        swipeEnabled: !isWeb,
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: theme.colors.text,
        drawerStyle: { backgroundColor: theme.colors.background },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: { fontSize: 16 },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userName={userName}
          profileImageUrl={profileImageUrl}
        />
      )}
    >
      <Drawer.Screen name="Seek" component={SeekScreen} />
      <Drawer.Screen name="News" component={SkNewsScreen} />
      <Drawer.Screen name="Study" component={SkStudyScreen} />
      <Drawer.Screen name="Sobre" component={SobreScreen} />
      <Drawer.Screen name="Favoritos" component={FavoriteScreen} />
      <Drawer.Screen name="FeedBack" component={FeedbackScreen} />
    </Drawer.Navigator>
  );
}

// Conteúdo personalizado do Drawer
function CustomDrawerContent(props) {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { userName, profileImageUrl } = props;

  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    estado: "",
    dtnasc: "",
    avatar: "",
  });

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData({
            nome: userData.nome || "Nome não disponível",
            email: userData.email || "Email não disponível",
            estado: userData.estado || "Estado não disponível",
            dtnasc: userData.dtnasc || "Data de nascimento não disponível",
            avatar: userData.avatar || "",
          });
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          padding: 20,
          alignItems: "center",
          backgroundColor: isDarkTheme ? "#333" : "#fff",
        }}
      >
        {profileImageUrl ? (
          <Avatar.Image size={80} source={{ uri: profileImageUrl }} />
        ) : (
          <Avatar.Icon size={80} icon="account" />
        )}
        <Title style={styles.userName}>
          {userData.nome || "Nome do Usuário"}
        </Title>
        <Button
          onPress={() => props.navigation.navigate("Profile")}
          mode="contained"
          style={{ marginTop: 10 }}
        >
          Ver Perfil
        </Button>
      </View>
      <DrawerItemList {...props} />
      <View style={{ padding: 20 }}>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </DrawerContentScrollView>
  );
}

// Navegação principal
export default function AppNavigator() {
  const { isDarkTheme } = useTheme();
  const themeNavigation = isDarkTheme
    ? ThemeDarkNavigation
    : ThemeLightNavigation;
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider theme={isDarkTheme ? ThemeDark : ThemeLight}>
      <NavigationContainer theme={themeNavigation}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Altere sua Senha"
                component={ConfirmaSenSeek}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="AlterarNomeScreen"
                component={AlterarNomeScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="AlterarEmailScreen"
                component={AlterarEmailScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="AlterarEstadoScreen"
                component={AlterarEstadoScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="AlterarDtNascimentoScreen"
                component={AlterarDataNascimentoScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: "",
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: true }}
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
