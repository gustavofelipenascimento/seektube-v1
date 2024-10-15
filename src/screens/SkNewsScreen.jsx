import { Button, Surface, TextInput } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";

export default function SkNewsScreen({ navigation }) {
  const {isDarkTheme} = useTheme()

  const imageSource = isDarkTheme
    ? require("../img/news-light.png")
    : require("../img/seeknews.png");

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <TextInput
          placeholder="Insira um link..."
          //   onChangeText={setEmail}
          //   value={email}
          style={styles.inputNews}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <View style={styles.conjunto}>
          <Button
            onPress={() => navigation.navigate("SignIn")}
            mode="contained-tonal"
            style={styles.buttonN}
          >
            Cortar
          </Button>

          <Button
            onPress={() => navigation.navigate("SignIn")}
            mode="contained-tonal"
            style={styles.buttonN}
          >
            Limpar
          </Button>

          <Button
            onPress={() => navigation.navigate("SignIn")}
            mode="contained-tonal"
            style={styles.news}
          >
            Seek!
          </Button>
        </View>

        {/* <TradeTheme /> */}
      </View>
    </Surface>
  );
}
