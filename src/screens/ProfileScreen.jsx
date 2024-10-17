import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import { Surface, Avatar, Title, Text, Button, Portal, Dialog, Paragraph, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'; // Importação correta
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../config/styles";

export default function ProfileScreen({ route, navigation }) {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    estado: "",
    dtnasc: "",
    avatar: "", // URL do avatar
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

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
            avatar: userData.profileImageUrl || "", // URL do avatar
          });
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

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

  const handleUploadImage = async () => {
    console.log("Iniciando upload da imagem...");
    if (selectedImage) {
      console.log("Imagem selecionada:", selectedImage);
      setIsUploading(true);
      const user = auth.currentUser;

      try {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(db, "usuarios", user.uid);
        await updateDoc(userDocRef, { profileImageUrl: downloadURL });

        setUserData((prevData) => ({
          ...prevData,
          avatar: downloadURL,
        }));

        setIsDialogVisible(false);
        setSelectedImage(null);
      } catch (error) {
        console.log("Erro ao fazer upload da imagem:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Surface style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        {userData.avatar ? (
          <Avatar.Image size={120} source={{ uri: userData.avatar }} style={styles.avatar} />
        ) : (
          <Avatar.Icon size={120} icon="account" style={styles.avatar} />
        )}
      </TouchableOpacity>

      <Title style={styles.title}>Perfil</Title>
      <Text>Nome: {userData.nome}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Estado: {userData.estado}</Text>
      <Text>Data de Nascimento: {userData.dtnasc}</Text>

      <Button mode="outlined" onPress={() => {
        auth.signOut();
        navigation.navigate("SignIn");
      }} style={styles.logoutButton}>
        Logout
      </Button>

      {/* Popup de confirmação do upload */}
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>Confirmar Alteração</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Deseja alterar a imagem do perfil?</Paragraph>
            {isUploading && <ActivityIndicator />}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleUploadImage} disabled={isUploading}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
}

