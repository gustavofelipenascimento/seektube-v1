import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { Surface, Text, Button, List, IconButton } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import styles from "../config/styles";

export default function FavoriteScreen({ route, navigation }) {
  const [favorites, setFavorites] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    // Carrega os favoritos do documento do usuário
    const fetchFavorites = async () => {
      if (user) {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFavorites(userData.favoritos || []);
        }
      }
    };

    fetchFavorites();
  }, [user, db]);

  useEffect(() => {
    // Adiciona o link recebido da SeekScreen, se disponível
    if (route.params?.videoLink) {
      const { videoLink } = route.params;
      addFavorite(videoLink);
    }
  }, [route.params]);

  const addFavorite = async (videoLink) => {
    if (!favorites.includes(videoLink)) {
      try {
        const userDocRef = doc(db, "usuarios", user.uid);

        // Adiciona o link ao campo 'favoritos' no Firestore
        await updateDoc(userDocRef, {
          favoritos: arrayUnion(videoLink),
        });

        setFavorites((prevFavorites) => [...prevFavorites, videoLink]);
        Alert.alert("Sucesso", "Vídeo adicionado aos favoritos!");
      } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        Alert.alert("Erro", "Não foi possível salvar o vídeo.");
      }
    } else {
      Alert.alert("Aviso", "Esse vídeo já está nos favoritos.");
    }
  };

  const removeFavorite = async (videoLink) => {
    try {
      const userDocRef = doc(db, "usuarios", user.uid);

      // Remove o link do campo 'favoritos' no Firestore
      await updateDoc(userDocRef, {
        favoritos: arrayRemove(videoLink),
      });

      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite !== videoLink)
      );
      Alert.alert("Sucesso", "Vídeo removido dos favoritos!");
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      Alert.alert("Erro", "Não foi possível remover o vídeo.");
    }
  };

  return (
    <Surface style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum vídeo favoritado ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item}
              description="Clique para abrir"
              left={() => <List.Icon icon="link" />}
              right={() => (
                <IconButton icon="delete" onPress={() => removeFavorite(item)} />
              )}
              onPress={() => navigation.navigate("VideoPlayerScreen", { videoLink: item })}
            />
          )}
        />
      )}
    </Surface>
  );
}