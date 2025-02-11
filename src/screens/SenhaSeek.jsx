import React, { useState } from "react";
import { Button, Surface, TextInput, ActivityIndicator } from "react-native-paper";
import { View, Text, ScrollView, Alert } from "react-native";
import styles from "../config/styles";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function SenhaSeek({ navigation }) {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { isDarkTheme } = useTheme();

  const handlePasswordRecovery = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setIsSending(true);
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Sucesso",
        "Um email para redefinição de senha foi enviado para o endereço fornecido."
      );
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      console.error("Erro ao enviar o email de recuperação:", error);
      Alert.alert("Erro", "Não foi possível enviar o email de recuperação.");
    } finally {
      setIsSending(false);
    }
  };

  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  return (
    <Surface style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <Text style={styles.title}>Recuperação de Senha</Text>

        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <View style={styles.conjunto2}>
          <Button
            onPress={handlePasswordRecovery}
            mode="contained-tonal"
            style={styles.seek}
            disabled={isSending}
          >
            <Text style={styles.buttxt2}>
              {isSending ? "Enviando..." : "Enviar Link de Recuperação"}
            </Text>
          </Button>
        </View>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.secondaryButton}
        >
          <Text style={styles.buttxt}>Voltar</Text>
        </Button>
      </ScrollView>
    </Surface>
  );
}
