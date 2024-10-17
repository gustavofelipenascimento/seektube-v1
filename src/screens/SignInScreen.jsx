import React, { useState } from "react";
import { View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../config/styles"; // Mantém seu estilo atual
import { Surface, TextInput, Button, Text } from "react-native-paper";
import { Image } from "expo-image";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para armazenar e exibir os erros

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Busca os dados do usuário no Firestore
      const userDoc = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // Certifique-se de que os dados do usuário estão definidos
        if (userData && userData.nome && userData.email) {
          // Redireciona para o DrawerNavigator, passando os dados do usuário
          navigation.navigate("DrawerNavigator", {
            nome: userData.nome,
            email: userData.email,
          });
        } else {
          setError("Dados de usuário incompletos.");
        }
      } else {
        setError("Dados de usuário não encontrados.");
      }
    } catch (error) {
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
      setError(errorMessage);  // Exibe a mensagem de erro
    }
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

        {/* Botão de login */}
        <Button
          style={styles.button}
          onPress={handleLogin}  // A função de login chamada aqui
          mode="contained-tonal"
        >
          Entrar
        </Button>

        {/* Botão de registro */}
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
          mode="contained-tonal"
        >
          Registrar
        </Button>

        {/* Exibindo erros, se houver */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Botão "Esqueci a senha" */}
        <Button
          style={styles.label}
          onPress={() => navigation.navigate("SenhaSeek")}
        >
          Esqueci a senha
        </Button>

        {/* Botão "Problemas para checar?" */}
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
