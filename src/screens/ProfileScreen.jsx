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
import * as FileSystem from "expo-file-system"; // Importar FileSystem para salvar a imagem localmente
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
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
            avatar: userData.localProfileImage || "", // Pega a imagem salva localmente
          });
        } else {
          Alert.alert("Erro", "Usuário não encontrado.");
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  // Função para solicitar permissões de acesso à galeria
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

  // Função para selecionar imagem da galeria
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setIsDialogVisible(true);
    }
  };

  // Função para fazer o upload da imagem e salvar localmente
  const handleUploadImage = async () => {
    console.log("Iniciando upload da imagem...");
    if (selectedImage) {
      console.log("Imagem selecionada:", selectedImage);
      setIsUploading(true);
      const user = auth.currentUser;

      try {
        // Definir o caminho local onde a imagem será salva
        const fileName = `${user.uid}_profile.jpg`; // Nome do arquivo de imagem
        const fileUri = `${FileSystem.documentDirectory}${fileName}`; // Caminho completo do arquivo

        // Salvar a imagem localmente
        await FileSystem.copyAsync({
          from: selectedImage,
          to: fileUri,
        });

        // Verificar se o arquivo foi realmente salvo
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        console.log("Informações do arquivo salvo:", fileInfo);

        if (!fileInfo.exists) {
          throw new Error("Erro ao salvar a imagem localmente.");
        }

        // Atualizar o Firestore com o caminho local da imagem
        const userDocRef = doc(db, "usuarios", user.uid);
        await updateDoc(userDocRef, { localProfileImage: fileUri });

        // Atualizar estado para refletir a nova imagem no frontend
        setUserData((prevData) => ({
          ...prevData,
          avatar: fileUri,
        }));

        Alert.alert("Sucesso", "Imagem de perfil alterada com sucesso!");
        setIsDialogVisible(false);
        setSelectedImage(null);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível alterar a imagem de perfil.");
        console.error("Erro ao fazer upload da imagem:", error);
      } finally {
        setIsUploading(false); // Certificar que o estado de upload será atualizado
      }
    } else {
      console.log("Nenhuma imagem selecionada.");
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
      <Text>Nome: {userData.nome}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Estado: {userData.estado}</Text>
      <Text>Data de Nascimento: {userData.dtnasc}</Text>

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
