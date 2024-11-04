import React, { useState } from "react";
import { View } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, Timestamp } from "firebase/firestore";
import { Surface, Text, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../config/styles";
import { useTheme } from "../contexts/ThemeContexts";

export default function AlterarDataNascimentoScreen({ navigation }) {
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const { isDarkTheme } = useTheme();

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") { // Adiciona verificação para evitar comportamento inesperado
      const currentDate = selectedDate || birthDate;
      setShowDatePicker(false);
      setBirthDate(currentDate);
    } else {
      setShowDatePicker(false); // Fecha o seletor se o usuário cancelar
    }
  };

  const handleUpdateBirthDate = async () => {
    setError("");
    setSuccessMessage("");

    const user = auth.currentUser;

    try {
      // Converte a data de nascimento para o formato de Timestamp do Firestore
      const birthDateTimestamp = Timestamp.fromDate(birthDate);
      
      // Atualiza a data de nascimento no Firestore
      await updateDoc(doc(db, "usuarios", user.uid), { dtnasc: birthDateTimestamp });

      setSuccessMessage("Data de nascimento atualizada com sucesso!");
      setTimeout(() => {
        navigation.goBack(); // Volta para a tela anterior após 1.5 segundos
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar a data de nascimento:", error);
      setError("Não foi possível atualizar a data de nascimento.");
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Alterar Data de Nascimento</Text>

        <Button mode="contained" onPress={() => setShowDatePicker(true)} style={styles.button}>
          Selecionar Data
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.inputxt}>Data selecionada: {birthDate.toLocaleDateString()}</Text>

        <Button mode="contained" onPress={handleUpdateBirthDate} style={styles.button}>
          Salvar
        </Button>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      </View>
    </Surface>
  );
}
