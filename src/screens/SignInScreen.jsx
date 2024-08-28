import React, { useState } from "react";
import { View,  ScrollView } from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import  styles  from "../config/styles";
import { Surface, TextInput, Button, Text} from "react-native-paper";
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
        <Text style={styles.title}>Login</Text>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
    

          <Button style={styles.button} onPress={handleLogin} mode="contained-tonal">Logar</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("SignUp")} mode="contained-tonal">Registrar</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("News")} mode="contained-tonal">SeekNews</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("Home")} mode="contained-tonal">SeekTube</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("Study")} mode="contained-tonal">SeekStudy</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("Sobre")} mode="contained-tonal">Sobre</Button>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </Surface>
    </ScrollView>
  );
}