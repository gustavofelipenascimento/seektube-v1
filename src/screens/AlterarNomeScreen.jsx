import React, { useState } from "react";
import { View, Alert } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Surface, TextInput, Button, Text } from "react-native-paper";
import styles from "../config/styles";
import { useTheme } from "../contexts/ThemeContexts";

export default function AlterarNomeScreen({ navigation }) {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const { isDarkTheme } = useTheme();

  const handleUpdateName = async () => {
    setError("");
    setSuccessMessage("");

    const user = auth.currentUser;

    if (!newName.trim()) {
      setError("O nome não pode estar vazio.");
      return;
    }

    try {
      // Atualiza o nome de exibição no Firebase Auth
      await updateProfile(user, { displayName: newName });
      // Atualiza o nome no Firestore
      await updateDoc(doc(db, "usuarios", user.uid), { nome: newName });

      setSuccessMessage("Nome atualizado com sucesso!");
      setTimeout(() => {
        navigation.goBack(); // Retorna para a tela anterior após 1.5 segundos
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar o nome:", error);
      setError("Não foi possível atualizar o nome.");
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Alterar Nome</Text>

        <TextInput
          placeholder="Digite o novo nome"
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Button mode="contained" onPress={handleUpdateName} style={styles.button}>
          Salvar
        </Button>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      </View>
    </Surface>
  );
}
