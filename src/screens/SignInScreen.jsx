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
        navigation.navigate("News");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <ScrollView>
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

        <Button style={styles.button} onPress={handleLogin} mode="contained">
          Entrar
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
          mode="contained"
        >
          Registrar
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("News")}
          mode="contained"
        >
          SeekNews
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
          mode="contained"
        >
          SeekTube
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Study")}
          mode="contained"
        >
          SeekStudy
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Sobre")}
          mode="contained"
        >
          Sobre
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Seek")}
          mode="contained"
        >
          Seek
        </Button>

        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Feedback")}
          mode="contained"
        >
          Feedback
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
    </ScrollView>
  );
}
