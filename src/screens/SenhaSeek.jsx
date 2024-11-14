import React, { useState } from "react";
import { View } from "react-native";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import styles from "../config/styles";
import { Surface, TextInput, Button, Text } from "react-native-paper";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";

export default function SenhaSeek({ navigation }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { isDarkTheme } = useTheme();

  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Um e-mail de redefinição de senha foi enviado.");
      })
      .catch((error) => {
        setMessage("Erro ao enviar e-mail de redefinição. Verifique o e-mail inserido.");
      });
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <Text style={styles.title}>Redefinir Sua Senha</Text>

        <Text style={styles.inputxt}>Digite seu Email:</Text>
        <TextInput
          placeholder="Coloque seu E-mail"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Button mode="contained" onPress={handlePasswordReset} style={styles.button}>
          Enviar
        </Button>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </Surface>
  );
}
