import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../config/styles";
import { Surface, TextInput, Button, Text } from "react-native-paper";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";

export default function SenhaSeek({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isDarkTheme } = useTheme();

  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("News");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <Text style={styles.title}>Altere Sua Senha</Text>

        <Text style={styles.inputxt}>Digite seu Email:</Text>
        <TextInput
          placeholder="Coloque seu E-mail"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Button mode="contained" style={styles.button}>
          Enviar
        </Button>
        <Text style={styles.error}>{error}</Text>
        <Button onPress={() => navigation.navigate("ConfirmaSenSeek")}>
          Um e-mail será enviado para a sua conta.
        </Button>
      </View>
    </Surface>
  );
}
