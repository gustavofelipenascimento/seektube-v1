import { Button, Surface, TextInput, } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import TradeTheme from "../contexts/TradeTheme";
import { Image } from "expo-image";


export default function ApiScreenTest ({navigation}) {
    return (
        <Surface style={styles.container}>
          <View style={styles.innerContainer}>
          <Image
                  style={styles.image}
                  source={require("../img/seektube.png")}
                />
    
    
         <TextInput
                  placeholder="Insira um link..."
                //   onChangeText={setEmail}
                //   value={email}
                  style={styles.input}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                />
    
    
    
        <View style={styles.conjunto}>
        {/* <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.button3}>
                Cortar       
            </Button>
    
            <Button onPress={() => navigation.navigate("SignIn")} mode="contained-tonal" style={styles.button3}>
              Limpar
            </Button> */}
    
            <Button onPress={() => navigation.navigate("ApiTest")} mode="contained-tonal" style={styles.seek}>
              Seek!
            </Button>
        </View>
          
    
           
    
            {/* <TradeTheme /> */}
          </View>
        </Surface>
      );
}
//REMOVE LATER