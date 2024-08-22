import { View } from 'react-native'
import { Text } from 'react-native-paper'
import styles from '../config/styles'


export default function SobreScreen() {
    return (
        <View>
            <Text style={styles.title}>Sobre<Text style={styles.purple}> Tube</Text></Text> 
        </View>
    )
}