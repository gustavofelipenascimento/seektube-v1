import React, { useEffect, useState } from "react";
import { TouchableOpacity, Alert, View, Dimensions } from "react-native";
import {
  Surface,
  Avatar,
  Title,
  Text,
  Button,
  Portal,
  Dialog,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../config/styles";

const { width } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    estado: "",
    dtnasc: "",
    avatar: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
            dtnasc: userData.dtnasc
              ? new Date(userData.dtnasc.seconds * 1000).toLocaleDateString()
              : "Data de nascimento não disponível",

            avatar: userData.avatar || "",
          });
        } else {
          Alert.alert("Erro", "Usuário não encontrado.");
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à sua galeria para trocar a imagem do perfil."
      );
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setSelectedImage(selectedAsset.uri);
      setIsDialogVisible(true);
    }
  };

  const handleUploadImage = async () => {
    if (selectedImage) {
      setIsUploading(true);
      const user = auth.currentUser;
      const storage = getStorage();

      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(db, "usuarios", user.uid);
        await updateDoc(userDocRef, { avatar: downloadURL });

        setUserData((prevData) => ({
          ...prevData,
          avatar: downloadURL,
        }));

        Alert.alert("Sucesso", "Imagem de perfil alterada com sucesso!");
        setIsDialogVisible(false);
        setSelectedImage(null);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível alterar a imagem do perfil.");
        console.error("Erro ao fazer upload da imagem:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Surface style={[styles.container]}>
      <TouchableOpacity onPress={handleImagePick}>
        {userData.avatar ? (
          <Avatar.Image
            size={120}
            source={{ uri: userData.avatar }}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Icon size={120} icon="account" style={styles.avatar} />
        )}
      </TouchableOpacity>

      <Title style={[styles.title]}>Perfil</Title>

      {/* Informações com botões à direita, responsivas */}
      <View
        style={[
          styles.infoContainer,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.05,
          },
        ]}
      >
        <Text style={[styles.profileInfo, { flex: 1 }]}>
          Nome: {userData.nome}
        </Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate("AlterarNomeScreen")}
          style={[styles.editButton]}
        >
          Alterar Nome
        </Button>
      </View>

      <View
        style={[
          styles.infoContainer,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.05,
          },
        ]}
      >
        <Text style={[styles.profileInfo, { flex: 1 }]}>
          Email: {userData.email}
        </Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate("AlterarEmailScreen")}
          style={[styles.editButton]}
        >
          Alterar Email
        </Button>
      </View>

      <View
        style={[
          styles.infoContainer,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.05,
          },
        ]}
      >
        <Text style={[styles.profileInfo, { flex: 1 }]}>
          Estado: {userData.estado}
        </Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate("AlterarEstadoScreen")}
          style={[styles.editButton]}
        >
          Alterar Estado
        </Button>
      </View>

      <View
        style={[
          styles.infoContainer,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.05,
          },
        ]}
      >
        <Text style={[styles.profileInfo, { flex: 1 }]}>
          Data de Nascimento: {userData.dtnasc}
        </Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate("AlterarDtNascimentoScreen")}
          style={[styles.editButton]}
        >
          Alterar Data
        </Button>
      </View>

      <View
        style={[
          styles.infoContainer,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.05,
          },
        ]}
      >
        <Text style={[styles.profileInfo, { flex: 1 }]}>Senha</Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate("Altere sua Senha")}
          style={[styles.editButton]}
        >
          Alterar Senha
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={() => {
          auth.signOut();
          navigation.navigate("SignIn");
        }}
        style={styles.logoutButton}
      >
        Logout
      </Button>

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Confirmar Alteração</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Deseja alterar a imagem do perfil?</Paragraph>
            {isUploading && <ActivityIndicator />}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleUploadImage} disabled={isUploading}>
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
}
