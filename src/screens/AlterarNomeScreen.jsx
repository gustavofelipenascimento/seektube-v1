import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import styles from "../config/styles";

export default function AlterarNomeScreen({ navigation }) {
  const [newName, setNewName] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  const handleUpdateName = async () => {
    const user = auth.currentUser;
    try {
      await updateProfile(user, { displayName: newName });
      await updateDoc(doc(db, "usuarios", user.uid), { nome: newName });
      Alert.alert("Sucesso", "Nome atualizado!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o nome.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Novo nome"
        value={newName}
        onChangeText={setNewName}
        style={styles.inputpfp}
      />
      <Button title="Salvar" onPress={handleUpdateName} />
    </View>
  );
}