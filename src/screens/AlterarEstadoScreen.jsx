import React, { useState } from "react";
import { View } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Surface, Text, TextInput, Button } from "react-native-paper";
import styles from "../config/styles";
import { useTheme } from "../contexts/ThemeContexts";

export default function AlterarEstadoScreen({ navigation }) {
  const [estado, setEstado] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const { isDarkTheme } = useTheme();

  const handleUpdateEstado = async () => {
    setError("");
    setSuccessMessage("");

    const user = auth.currentUser;

    try {
      // Atualiza o estado no Firestore
      await updateDoc(doc(db, "usuarios", user.uid), { estado: estado });

      setSuccessMessage("Estado atualizado com sucesso!");
      setTimeout(() => {
        navigation.goBack(); // Volta para a tela anterior após 1.5 segundos
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar o estado:", error);
      setError("Não foi possível atualizar o estado.");
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Alterar Estado</Text>

        <TextInput
          label="Novo Estado"
          value={estado}
          onChangeText={setEstado}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Button mode="contained" onPress={handleUpdateEstado} style={styles.button}>
          Salvar
        </Button>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      </View>
    </Surface>
  );
}
