import React, { useState } from "react";
import { Button, Surface, TextInput } from "react-native-paper";
import { View, Text } from "react-native";
import styles from "../config/styles";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";
import axios from "axios";


export default function SeekScreen({ navigation }) {
  const [youtubeLink, setYoutubeLink] = useState(""); // Armazena o link do usuário
  const [error, setError] = useState(""); // Armazena erros de validação
  const { isDarkTheme} = useTheme();

  // Função para validar se o link é do YouTube
 /* const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };*/

  const handleSeek = async () => {
    //if (validateYouTubeUrl(youtubeLink)){
    try {
        const response = await axios.post('http://127.0.0.1:5000/process', { data: youtubeLink });
        navigation.navigate('ApiTest', { result: response.data });
    } catch (error) {
        console.error(error);
    }
  /*} else {
    console.error("Erro com o link do youtube", error);
  }*/
  };
  // Função para limpar o campo de texto e os erros
  const handleClear = () => {
    setYoutubeLink(""); // Limpa o campo de texto
    setError(""); // Limpa a mensagem de erro
  };


  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <TextInput
          placeholder="Insira um link..."
          value={youtubeLink} // O valor do campo de texto
          onChangeText={setYoutubeLink}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        {/* Exibir erro se o link for inválido */}
        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}

        <View style={styles.conjunto}>
          <Button
            onPress={handleSeek}
            mode="contained-tonal"
            style={styles.button3}
          >
            Cortar
          </Button>

          <Button
            onPress={handleClear}
            mode="contained-tonal"
            style={styles.button3}
          >
            Limpar
          </Button>

          <Button
            onPress={handleSeek}
            mode="contained-tonal"
            style={styles.seek}
          >
            Seek!
          </Button>
        </View>
      </View>
    </Surface>
  );
}
