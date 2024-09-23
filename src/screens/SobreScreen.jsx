import { Surface, Text } from "react-native-paper";
import styles from "../config/styles";
import { View } from "react-native";
import { Image } from "expo-image";


    export default function SobreScreen({ navigation }) {
        return (
      
            <Surface style={styles.container}>

              <View style={styles.innerContainer}>

              <Image
              style={styles.imagesobre}
              source={require("../img/seektube.png")}
            />
                <Text style={styles.titlesobre}>Sobre</Text>
                <Text style={styles.sobre}>
                  Aqui estaremos apresentando a Equipe SeekTube. A iniciativa surgiu
                  por um trabalho escolar de Projeto Integrador, onde foram juntadas
                  pessoas bem capacitadas em áreas diferentes para se unirem com a
                  finalidade de criar um site com o objetivo de pesquisa por meio de
                  vídeos onde futuramente se chamaria “SeekTube”, e ao longo do ano
                  foi evoluindo sua ideia e modelo.
                </Text>
      
                <Text style={styles.sobre}>
                  Este site tem como objetivo ajudar as pessoas em sua forma de
                  pesquisa por meio de links do Youtube, com a intenção de facilitar e
                  objetivar suas pesquisas. Toda nossa experiência aqui é resultado
                  dos cursos técnicos do Senac, sem a ajuda dos professores isso não
                  seria possível.
                </Text>
      
                <Text style={styles.sobre}>
                  Esperamos que nosso site possa ajudar muitas pessoas e talvez
                  futuramente expandir para reconhecimento de nome, para podermos
                  ganhar nosso devido valor. Temos muitas expectativas e planejaremos
                  melhorar o nosso site cada vez mais à medida que evoluirmos
                  profissionalmente, acompanhe nossa evolução!
                </Text>
              </View>
            </Surface>
     
        );
      }
 