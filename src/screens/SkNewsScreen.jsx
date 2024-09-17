import { Button, Surface, TextInput, } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import TradeTheme from "../contexts/TradeTheme";
import { Image } from "expo-image";



export default function SkNewsScreen({navigation}) {
  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
      <Image
              style={styles.image}
              source={require("../img/seeknews.png")}
            />


     <TextInput
              placeholder="Insira um link..."
            //   onChangeText={setEmail}
            //   value={email}
              style={styles.inputNews}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />



    <View style={styles.conjunto}>
    <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.buttonN}>
            Cortar       
        </Button>

        <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.buttonN}>
          Limpar
        </Button>

        <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.news}>
          Seek!
        </Button>
    </View>
      

       

        {/* <TradeTheme /> */}
      </View>
    </Surface>
  );
}
