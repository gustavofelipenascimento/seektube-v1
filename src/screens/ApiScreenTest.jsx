import React from "react";
import { Button, Surface, TextInput } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import { Image } from "expo-image";

export default function ApiScreenTest({ route, navigation }) {
  // Extraindo o link passado pela SeekScreen
  const { url } = route.params;
  const { apiResponse } = route.params;

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require("../img/seektube.png")}
        />

        {/* Colocando o link recebido no TextInput */}
        <TextInput
          placeholder="Insira um link..."
          value={url} // Define o valor do input como o link recebido
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <TextInput
          placeholder="links"
          value={JSON.stringify(apiResponse)} // Define o valor do input como o link recebido
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <View style={styles.conjunto}>
          <Button
            onPress={() => navigation.navigate("SeekScreen")} // Pode navegar de volta se necessário
            mode="contained-tonal"
            style={styles.seek}
          >
            Voltar
          </Button>
        </View>
      </View>
    </Surface>
  );
}
