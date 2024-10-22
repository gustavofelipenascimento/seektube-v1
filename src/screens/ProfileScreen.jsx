import React, { useEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
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
            dtnasc: userData.dtnasc || "Data de nascimento não disponível",
            avatar: userData.avatar || "", // Agora usamos a URL da imagem no Firebase Storage
          });
        } else {
          Alert.alert("Erro", "Usuário não encontrado.");
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  // Solicitar permissões de acesso à galeria
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

  // Selecionar imagem da galeria
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

  // Upload da imagem para o Firebase Storage
  const handleUploadImage = async () => {
    if (selectedImage) {
      setIsUploading(true);
      const user = auth.currentUser;
      const storage = getStorage();

      try {
        // Ler o arquivo como blob
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        // Criar uma referência no Firebase Storage
        const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);

        // Fazer o upload
        await uploadBytes(storageRef, blob);

        // Obter a URL de download
        const downloadURL = await getDownloadURL(storageRef);

        // Atualizar o Firestore com a URL da imagem
        const userDocRef = doc(db, "usuarios", user.uid);
        await updateDoc(userDocRef, { avatar: downloadURL });

        // Atualizar estado para refletir a nova imagem no frontend
        setUserData((prevData) => ({
          ...prevData,
          avatar: downloadURL,
        }));

        Alert.alert("Sucesso", "Imagem de perfil alterada com sucesso!");
        setIsDialogVisible(false);
        setSelectedImage(null);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível alterar a imagem de perfil.");
        console.error("Erro ao fazer upload da imagem:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Surface style={styles.container}>
      {/* Avatar do perfil com opção de alterar imagem */}
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

      <Title style={styles.title}>Perfil</Title>
      <Text style={styles.profileInfo}>Nome: {userData.nome}</Text>
      <Text style={styles.profileInfo}>Email: {userData.email}</Text>
      <Text style={styles.profileInfo}>Estado: {userData.estado}</Text>
      <Text style={styles.profileInfo}>
        Data de Nascimento: {userData.dtnasc}
      </Text>

      <Button
        mode="outlined"
        onPress={() => {
          auth.signOut();
          navigation.navigate("SignIn");
        }}
        style={styles.logoutButton}
      >
        Logout
      </Button>

      {/* Popup de confirmação do upload */}
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
