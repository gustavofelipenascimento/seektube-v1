import { Button, Surface, } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import TradeTheme from "../contexts/TradeTheme";
import { Image } from "expo-image";



export default function HomeScreen({navigation}) {
  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
      <Image
              style={styles.image}
              source={require("../img/seektube.png")}
            />

   
        <Button onPress={() => navigation.navigate("SignIn")} mode="contained" style={styles.button}>
          Entrar
        </Button>

        <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.button2}>
          Não tem uma conta? Cadastre-se
        </Button>

        
        <Button style={styles.label} onPress={() => navigation.navigate("SignIn")}>
          Problemas para fazer login?
        </Button>

        {/* <TradeTheme /> */}
      </View>
    </Surface>
  );
}
