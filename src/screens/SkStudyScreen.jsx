import { Button, Surface, TextInput, } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContexts";



export default function SkStudyScreen({navigation}) {
  const { isDarkTheme} = useTheme();

  const imageSource = isDarkTheme
    ? require("../img/study-light.png")
    : require("../img/seekstudy.png");

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
      <Image
              style={styles.image}
              source={imageSource}
            />


     <TextInput
              placeholder="Insira um link..."
            //   onChangeText={setEmail}
            //   value={email}
              style={styles.inputStudy}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />



    <View style={styles.conjunto}>
    <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.buttonS}>
            Cortar       
        </Button>

        <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.buttonS}>
          Limpar
        </Button>

        <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.study}>
          Seek!
        </Button>
    </View>
      

       

        {/* <TradeTheme /> */}
      </View>
    </Surface>
  );
}
