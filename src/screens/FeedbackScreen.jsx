import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Surface, TextInput, Button, Text, Snackbar } from "react-native-paper";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";
import styles from "../config/styles";

export default function FeedbackScreen({ navigation }) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const { isDarkTheme } = useTheme();

  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  const handleSendFeedback = async () => {
    if (!feedback.trim()) {
      setError("O campo de feedback não pode estar vazio.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/send-feedback", { // Alterar para o URL do seu servidor
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessVisible(true);
        setFeedback("");
      } else {
        setError(data.error || "Erro ao enviar feedback.");
      }
    } catch (error) {
      setError("Erro de conexão.");
      console.error("Erro ao enviar feedback:", error);
    }
  };
  

  return (
    <Surface style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <Image style={styles.image} source={imageSource} />

        <Text style={styles.title}>Você que manda!</Text>
        <Text style={styles.feedSpan}>
          Caso queira reportar um erro em nosso site, entre em contato e fale diretamente conosco!
        </Text>

        <TextInput
          label="Seu Feedback"
          placeholder="Sua mensagem aqui"
          value={feedback}
          onChangeText={setFeedback}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={styles.textArea}
        />

        <Button
          style={styles.button}
          onPress={handleSendFeedback}
          loading={isSubmitting}
          disabled={isSubmitting}
          icon="send"
          mode="contained"
        >
          Enviar
        </Button>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Snackbar
          visible={successVisible}
          onDismiss={() => setSuccessVisible(false)}
          duration={2000}
          style={styles.snackbar}
        >
          Obrigado pelo seu feedback!
        </Snackbar>
      </KeyboardAvoidingView>
    </Surface>
  );
}
