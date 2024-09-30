import { View } from "react-native";
import { Surface, Text } from "react-native-paper";
import styles from "../config/styles";


export default function TermosScreen(){
    return(
        <Surface style={styles.container}>
            <View>
                <Text style={styles.title}>Termos de Uso</Text>
            </View>
        </Surface>
    )
}