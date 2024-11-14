import React, { useState } from "react";
import { View, Alert } from "react-native";
import { getAuth, updateEmail } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Surface, TextInput, Button, Text } from "react-native-paper";
import styles from "../config/styles";
import { useTheme } from "../contexts/ThemeContexts";

export default function AlterarEmailScreen({ navigation }) {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const { isDarkTheme } = useTheme();

  const handleUpdateEmail = async () => {
    setError("");
    setSuccessMessage("");

    const user = auth.currentUser;

    if (!newEmail.trim()) {
      setError("O email não pode estar vazio.");
      return;
    }

    try {
      // Atualiza o email no Firebase Auth
      await updateEmail(user, newEmail);
      // Atualiza o email no Firestore
      await updateDoc(doc(db, "usuarios", user.uid), { email: newEmail });

      setSuccessMessage("Email atualizado com sucesso!");
      setTimeout(() => {
        navigation.goBack(); // Retorna para a tela anterior após 1.5 segundos
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar o email:", error);
      setError("Não foi possível atualizar o email. Por favor, faça login novamente e tente novamente.");
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Alterar Email</Text>

        <TextInput
          placeholder="Digite o novo email"
          value={newEmail}
          onChangeText={setNewEmail}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button mode="contained" onPress={handleUpdateEmail} style={styles.button}>
          Salvar
        </Button>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      </View>
    </Surface>
  );
}
