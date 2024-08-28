import { Button, Surface, Text } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";

export default function HomeScreen({navigation}) {
  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>You're Welcome to the our app</Text>
        <Button onPress={() => navigation.navigate("SignUp")} mode="contained">
          Login
        </Button>
      </View>
    </Surface>
  );
}
