import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../config/styles";
import { Surface, TextInput, Button, Text } from "react-native-paper";
import { Image } from "expo-image";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("App");
      })
      .catch((error) => {
        let errorMessage;
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "O e-mail fornecido é inválido.";
            break;
          case "auth/user-not-found":
            errorMessage = "Nenhum usuário encontrado com esse e-mail.";
            break;
          case "auth/wrong-password":
            errorMessage = "Senha incorreta.";
            break;
          case "auth/user-disabled":
            errorMessage = "A conta do usuário foi desativada.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Problema na conexão de rede. Tente novamente.";
            break;
          default:
            errorMessage = "Ocorreu um erro desconhecido. Tente novamente.";
        }
        setError(errorMessage);
      });
  };

  return (
      <Surface style={styles.container}>
        <View style={styles.innerContainer}>
          <Image style={styles.image} source={require("../img/seektube.png")} />

          <Text style={styles.title}>Faça Login</Text>

          <Text style={styles.inputxt}>Email ou Nome:</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            selectionColor="false"
          />

          <Text style={styles.inputxt}>Senha:</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />

          <Button
            style={styles.button}
            onPress={handleLogin}
            mode="contained-tonal"
          >
            Entrar
          </Button>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("SignUp")}
            mode="contained-tonal"
          >
            Registrar
          </Button>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            style={styles.label}
            onPress={() => navigation.navigate("SenhaSeek")}
          >
            Esqueci a senha
          </Button>

          <Button
            style={styles.label}
            onPress={() => navigation.navigate("Feedback")}
          >
            Problemas para checar?
          </Button>
        </View>
      </Surface>
  );
}
