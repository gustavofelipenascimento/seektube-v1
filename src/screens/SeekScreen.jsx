import React, { useState } from "react";
import { Button, Surface, TextInput } from "react-native-paper";
import { View, Text } from "react-native";
import styles from "../config/styles";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";

export default function SeekScreen({ navigation }) {
  const [youtubeLink, setYoutubeLink] = useState(""); // Armazena o link do usuário
  const [error, setError] = useState(""); // Armazena erros de validação
  const { isDarkTheme} = useTheme();

  // Função para validar se o link é do YouTube
  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  // Função chamada quando o usuário clica no botão "Seek!"
  const handleSeek = () => {
    if (validateYouTubeUrl(youtubeLink)) {
      // Se o link for válido, navega para a tela "ApiTest" com o link
      setError(""); // Limpa qualquer erro anterior
      navigation.navigate("ApiTest", { url: youtubeLink });
      axios.post('http://172.20.132.112:5000/api/post-endpoint', { input: inputValue })
      .then(response => {
        // Navega para a segunda página com a resposta da API
        navigation.navigate('ApiTest', { apiResponse: response.data });
      })
      .catch(error => {
        console.error("Erro ao enviar dados:", error);
      });
      setYoutubeLink(""); // Limpa o campo de texto após a navegação
          // Envia dados para a API
    } else {
      // Se o link for inválido, exibe mensagem de erro
      setError("Insira um link do YouTube corretamente.");
    }
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
          onChangeText={setYoutubeLink} // Atualiza o estado com o link inserido
          value={youtubeLink} // O valor do campo de texto
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
