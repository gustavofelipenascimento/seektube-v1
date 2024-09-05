import { Button, Surface, Text, Image } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import TradeTheme from "../contexts/TradeTheme";

export default function HomeScreen({navigation}) {
  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>You're Welcome to the our app</Text>
        <Button onPress={() => navigation.navigate("SignIn")} mode="contained" style={styles.button}>
          Login
        </Button>
        <TradeTheme />
      </View>
    </Surface>
  );
}
