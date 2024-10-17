import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  ThemeDark,
  ThemeLight,
  ThemeDarkNavigation,
  ThemeLightNavigation,
} from "../config/theme";
import { useTheme } from "../contexts/ThemeContexts";
import {
  Provider,
  Switch,
  Avatar,
  Title,
  Button,
  Menu,
  Divider,
} from "react-native-paper";
import { View, TouchableOpacity, Image } from "react-native";
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
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import styles from "../config/styles";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  const { isDarkTheme } = useTheme();
  const dimensions = useWindowDimensions();

  const theme = isDarkTheme ? ThemeDark : ThemeLight;
  const isWeb = dimensions.width >= 768;

  const [profileImageUrl, setProfileImageUrl] = useState(null); // Armazena a URL da imagem do usuário
  const [userName, setUserName] = useState(""); // Armazena o nome do usuário

  const auth = getAuth(); // Autenticação do Firebase
  const db = getFirestore(); // Instância do Firestore

  // Função para buscar a URL da imagem do perfil
  const fetchProfileData = async () => {
    const user = auth.currentUser; // Usuário logado
    if (user) {
      const userDoc = doc(db, "usuarios", user.uid); // Referência ao documento do usuário
      const userSnap = await getDoc(userDoc); // Obtem os dados do Firestore
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setProfileImageUrl(userData.profileImageUrl); // Pega a URL da imagem de perfil
        setUserName(userData.name); // Pega o nome do usuário
      }
    }
  };

  // Chama a função para buscar a imagem do perfil ao montar o componente
  useEffect(() => {
    fetchProfileData();
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Drawer.Navigator
      initialRouteName="SeekScreen"
      screenOptions={{
        drawerType: isWeb ? "permanent" : "front",
        swipeEnabled: !isWeb,
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: theme.colors.text,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShown: () => (
          <Provider>
            <View style={{ paddingRight: 10 }}>
              {/* Botão de perfil com foto do usuário e menu suspenso */}
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={openMenu} // Abre o menu ao clicar
                  >
                    {/* Substitui o ícone pela foto do usuário ou mantém um ícone padrão caso não haja imagem */}
                    {profileImageUrl ? (
                      <Image
                        source={{ uri: profileImageUrl }} // Usa a URL da imagem
                        style={{ width: 40, height: 40, borderRadius: 20 }} // Estilo da imagem do usuário
                      />
                    ) : (
                      <Avatar.Icon size={40} icon="account" color="#ffffff" />
                    )}
                  </TouchableOpacity>
                }
                contentStyle={{ backgroundColor: theme.colors.background }}
              >
                {/* Opção de editar perfil com ícone */}
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate("Profile");
                  }}
                  title="Editar Perfil"
                  icon="account-edit"
                />
                <Divider />
                {/* Opção de sair com ícone */}
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate("Splash");
                  }}
                  title="Sair"
                  icon="logout"
                />
              </Menu>
            </View>
          </Provider>
        ),
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
      <Drawer.Screen name="ConfirmaSenSeek" component={ConfirmaSenSeek} />
      <Drawer.Screen name="Sobre" component={SobreScreen} />
      <Drawer.Screen name="ApiTest" component={ApiScreenTest} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { userName, profileImageUrl } = props;
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    estado: "",
    dtnasc: "",
    avatar: "", // URL do avatar
  });

  const auth = getAuth();
  const db = getFirestore();

  const fetchUserData = async () => {
    const user = auth.currentUser; // Pega o usuário atual
    if (user) {
      const userDocRef = doc(db, "usuarios", user.uid); // Referência ao documento do usuário
      const userDoc = await getDoc(userDocRef); // Obtém os dados do Firestore

      if (userDoc.exists()) {
        const userData = userDoc.data(); // Pega os dados do documento
        setUserData({
          nome: userData.nome || "Nome não disponível",
          email: userData.email || "Email não disponível",
          estado: userData.estado || "Estado não disponível",
          dtnasc: userData.dtnasc || "Data de nascimento não disponível",
          avatar: userData.profileImageUrl || "", // URL do avatar
        });
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [auth.currentUser]);

  return (
    <DrawerContentScrollView {...props}>
      {/* Avatar e Nome do Usuário */}
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
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          ) : (
            <>
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
