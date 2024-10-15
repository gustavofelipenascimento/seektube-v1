import { Avatar, Button, Surface } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";

export default function HomeScreen({ navigation }) {
  const { isDarkTheme} = useTheme();

  const imageSource = isDarkTheme
    ? require("../img/seek-light.png")
    : require("../img/seektube.png");

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={imageSource} />

        <Button
          onPress={() => navigation.navigate("SignIn")}
          mode="contained-tonal"
          style={styles.button}
        >
          Entrar
        </Button>

        <Button
          onPress={() => navigation.navigate("SignUp")}
          mode="contained-tonal"
          style={styles.button2}
        >
          Não tem uma conta? Cadastre-se
        </Button>

        <Button
          style={styles.label}
          onPress={() => navigation.navigate("SignIn")}
        >
          Problemas para fazer login?
        </Button>

        <View style={styles.conjunto}>
          <Button>
            <Avatar.Icon
              style={{ ...styles.littlebutton }}
              icon="github"
              color="#fff"
            />
          </Button>

          <Button>
            <Avatar.Icon
              style={styles.littlebutton}
              icon="email-outline"
              color="#fff"
            />
          </Button>

          <Button>
            <Avatar.Icon
              style={styles.littlebutton}
              icon="instagram"
              color="#fff"
              size={60}
            />
          </Button>

          {/* I'M GOING CRAZY SAVE ME PLS THIS CODE IS A BULLSHIT */}
        </View>
        {/* <TradeTheme /> */}
      </View>
    </Surface>
  );
}
