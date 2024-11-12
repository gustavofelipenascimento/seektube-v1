import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Surface, TextInput, Button, Text, IconButton, Snackbar } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import styles from "../config/styles";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";


export default function FeedbackScreen({ navigation }) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const handleSubmitFeedback = async () => {
    setError("");

    if (!feedback.trim()) {
      setError("O campo de feedback não pode estar vazio.");
      return;
    }

    setIsSubmitting(true);

    const user = auth.currentUser;
    const feedbackData = {
      userId: user ? user.uid : "usuário anônimo",
      feedback: feedback.trim(),
      timestamp: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "feedback"), feedbackData);

      setSuccessVisible(true);
      setFeedback(""); // Limpa o campo de feedback
      setTimeout(() => navigation.goBack(), 1500); // Retorna à tela anterior após 1.5 segundos
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      setError("Não foi possível enviar seu feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { isDarkTheme} = useTheme();

  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  return (
    <Surface style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >

      
        <Image style={styles.image} source={imageSource} />

        <Text style={styles.title}>Você que manda!</Text>
        <Text style={styles.feedSpan}>Caso queira reportar um erro em nosso site, entre em contato e fale diretamente conosco!</Text>

        <TextInput
          placeholder="Email"
          value={feedback}
          onChangeText={setFeedback}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />


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
          onPress={handleSubmitFeedback}
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
