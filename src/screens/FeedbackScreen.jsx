import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Surface, TextInput, Button, Text, Snackbar } from "react-native-paper";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";
import * as MailComposer from "expo-mail-composer"; 
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

  const handleSendEmail = async () => {
    setError("");
    if (!feedback.trim()) {
      setError("O campo de feedback não pode estar vazio.");
      return;
    }

    setIsSubmitting(true);

    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        setError("O envio de e-mail não está disponível neste dispositivo.");
        return;
      }

      await MailComposer.composeAsync({
        recipients: ["darknesshimmui@gmail.com"], // Seu e-mail de destino
        subject: "Feedback do usuário",
        body: feedback,
      });

      setSuccessVisible(true);
      setFeedback("");
      setTimeout(() => navigation.goBack(), 1500);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      setError("Não foi possível enviar seu feedback.");
    } finally {
      setIsSubmitting(false);
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
          onPress={handleSendEmail}
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
