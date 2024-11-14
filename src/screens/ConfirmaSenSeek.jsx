import React, { useState } from "react";
import { View } from "react-native";
import { auth } from "../config/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import styles from "../config/styles";
import { Surface, TextInput, Button, Text } from "react-native-paper";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";

export default function ConfirmaSenSeek({ navigation }) {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { isDarkTheme } = useTheme();

  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  const handlePasswordUpdate = async () => {
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      try {
        // Reautentica o usuário com a senha atual
        await reauthenticateWithCredential(user, credential);
        console.log("Usuário reautenticado com sucesso.");

        // Atualiza a senha para a nova senha
        await updatePassword(user, newPassword);
        console.log("Senha alterada com sucesso!");
        setMessage("Senha alterada com sucesso!");
        navigation.navigate("Seek"); // Redireciona para a tela desejada
      } catch (error) {
        console.error("Erro na reautenticação ou atualização da senha:", error);
        if (error.code === "auth/wrong-password") {
          setError("Senha atual incorreta.");
        } else if (error.code === "auth/weak-password") {
          setError("A nova senha é muito fraca. Escolha uma senha mais forte.");
        } else {
          setError("Erro ao alterar a senha. Tente novamente.");
        }
      }
    } else {
      setError("Usuário não autenticado.");
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <Text style={styles.title}>Altere Sua Senha</Text>

        <Text style={styles.inputxt}>Senha Atual:</Text>
        <TextInput
          placeholder="Digite sua senha atual"
          onChangeText={setCurrentPassword}
          value={currentPassword}
          secureTextEntry
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Text style={styles.inputxt}>Nova Senha:</Text>
        <TextInput
          placeholder="Digite sua nova senha"
          onChangeText={setNewPassword}
          value={newPassword}
          secureTextEntry
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Text style={styles.inputxt}>Confirmar Nova Senha:</Text>
        <TextInput
          placeholder="Confirme sua nova senha"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Button mode="contained" onPress={handlePasswordUpdate} style={styles.button}>
          Enviar
        </Button>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}
      </View>
    </Surface>
  );
}
