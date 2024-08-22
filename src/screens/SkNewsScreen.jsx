import { View } from 'react-native'
import { Text } from 'react-native-paper'
import styles from '../config/styles'


export default function SkNewsScreen() {
    return (
        <View>
            <Text style={styles.title}>Seek News<Text style={styles.purple}> Tube</Text></Text> 
        </View>
    )
}