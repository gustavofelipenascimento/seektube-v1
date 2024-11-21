import React, { useState } from "react";
import { Button, Surface, TextInput, ActivityIndicator } from "react-native-paper";
import { View, Text, ScrollView } from "react-native";
import styles from "../config/styles";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";
import axios from "axios";

export default function SeekScreen({}) {
  const [youtubeLink, setYoutubeLink] = useState(""); // Link do usuário
  const [error, setError] = useState(""); // Mensagem de erro
  const [items, setItems] = useState([]); // Armazena os links vindos do servidor
  const [isLoading, setIsLoading] = useState(false); // Indica se o carregamento está ativo
  const { isDarkTheme } = useTheme();
  const motorBusca = useState("news"); //modelo seek

  // Valida se o link é do YouTube
  const validateYouTubeUrl = (youtubeLink) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(youtubeLink);
  };

  // Envia o link para o servidor Flask e obtém os dados
  const handleSeek = async () => {
    if (validateYouTubeUrl(youtubeLink)) {
      setIsLoading(true); // Inicia o loading
      try {
        const response = await axios.post("http://172.20.132.130:8081/process", {
          data: youtubeLink,
          modelo: motorBusca
        },
        {
          headers:  { "Content-Type": "application/json" },
        });

        // Atualiza a lista de links vindos do servidor
        setItems(response.data || []);
        console.log(response)
        setError(""); // Remove erros, se houver
      } catch (error) {
        console.error("Erro ao processar o link:", error);
        setError("Não foi possível processar o link.");
      } finally {
        setIsLoading(false); // Finaliza o loading
      }
    } else {
      setError("Insira um link válido do YouTube.");
    }
  };

  // Limpa os campos e os resultados
  const handleClear = () => {
    setYoutubeLink("");
    setError("");
    setItems([]);
  };

  // Define a imagem com base no tema
  const imageSource = isDarkTheme
    ? require("../img/news-light.png")
    : require("../img/seeknews.png");

  return (
    <Surface style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <TextInput
          placeholder="Insira um link..."
          value={youtubeLink}
          onChangeText={setYoutubeLink}
          style={styles.inputNews}
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
            style={styles.buttonN}
            disabled={isLoading} // Desabilita o botão enquanto carrega
          >
            Cortar
          </Button>

          <Button
            onPress={handleClear}
            mode="contained-tonal"
            style={styles.buttonN}
          >
            Limpar
          </Button>

          <Button
            onPress={handleSeek}
            mode="contained-tonal"
            style={styles.news}
            disabled={isLoading} // Desabilita o botão enquanto carrega
          >
            Seek!
          </Button>
        </View>

        {/* Exibir o loading enquanto aguarda a resposta */}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            style={styles.indicadorSeek}
            animating={true}
            color="#d5466d" // Cor do indicador de carregamento
          />
        ) : (
          // Renderizar os links recebidos do servidor
          items.length > 0 && (
            <View>
              <Text style={styles.itemstextSeek}>
                Links Processados:
              </Text>
              {items.map((item, index) => (
                <View
                  key={index}
                  style={styles.itemsviewSeek}
                >
                  {/* Input do link */}
                  <a href={item} target="_blank" rel="noopener noreferrer">
                    <TextInput
                      value={item}
                      editable={false}
                      style={styles.inputlinkSeek}
                    />
                  </a>

                </View>
              ))}
            </View>
          )
        )}
      </ScrollView>
    </Surface>
  );
}
