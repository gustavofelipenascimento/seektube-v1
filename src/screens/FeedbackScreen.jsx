import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Surface, TextInput, Button, Text, IconButton, Snackbar } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import styles from "../config/styles";

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

  return (
    <Surface style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />

        <Text style={styles.title}>Enviar Feedback</Text>

        <TextInput
          label="Seu Feedback"
          placeholder="Escreva aqui seu feedback"
          value={feedback}
          onChangeText={setFeedback}
          multiline
          style={styles.textArea}
          mode="outlined"
          activeOutlineColor="#6200ee"
          theme={{ colors: { placeholder: "#000", text: "#000" } }}
        />

        <Button
          mode="contained"
          onPress={handleSubmitFeedback}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.submitButton}
          icon="send"
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
