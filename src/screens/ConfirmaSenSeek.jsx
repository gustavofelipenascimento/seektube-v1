import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../config/styles";
import { Surface, TextInput, Button, Text } from "react-native-paper";
import { Image } from "expo-image";



export default function ConfirmaSenSeek({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
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
                <Image
                  style={styles.image}
                  source={require("../img/seektube.png")}
                />
    
                <Text style={styles.title}>Altere Sua Senha</Text>
                
    
                <Text style={styles.inputxt}>Nova Senha:</Text>
                    <TextInput
                    placeholder="Coloque sua nova senha"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                    style={styles.input}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    />

                   <Text style={styles.inputxt}>Confirmar Senha:</Text>
                    <TextInput
                    placeholder="Confirme sua senha"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry
                    style={styles.input}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    />
            
                <Button mode="contained" style={styles.button}>
                  Enviar
                </Button>
                <Text style={styles.error}>{error}</Text>
                
    
                
              </View>
            </Surface>
      );
}