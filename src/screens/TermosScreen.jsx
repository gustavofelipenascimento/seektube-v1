import { ScrollView, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import styles from "../config/styles";

export default function TermosScreen() {
  return (
    <ScrollView>
      <Surface style={styles.container}>
        <View>
          <Text style={styles.title}>Termos de Uso</Text>
          <Text>1. Sobre nossos termos</Text>
          <Text>
            Ao acessar o aplicativo SeekTube, concorda em cumprir estes termos
            de serviço, todas as leis e regulamentos aplicáveis e concorda que é
            responsável pelo cumprimento de todas as leis locais aplicáveis. Se
            você não concordar com algum desses termos, está proibido de usar ou
            acessar este aplicativo. Os materiais contidos neste aplicativo são
            protegidos pelas leis de direitos autorais e marcas comerciais
            aplicáveis.
          </Text>
          <Text>2. Uso de Licença </Text>
          <Text>
            É concedida permissão para baixar temporariamente uma cópia dos
            materiais (informações ou software) no aplicativo SeekTube , apenas
            para visualização transitória pessoal e não comercial. Esta é a
            concessão de uma licença, não uma transferência de título e, sob
            esta licença, você não pode: modificar ou copiar os materiais; usar
            os materiais para qualquer finalidade comercial ou para exibição
            pública (comercial ou não comercial); tentar descompilar ou fazer
            engenharia reversa de qualquer software contido no aplicativo
            SeekTube; remover quaisquer direitos autorais ou outras notações de
            propriedade dos materiais; ou transferir os materiais para outra
            pessoa ou 'espelhar' os materiais em qualquer outro servidor. Esta
            licença será automaticamente rescindida se você violar alguma dessas
            restrições e poderá ser rescindida por SeekTube a qualquer momento.
            Ao encerrar a visualização desses materiais ou após o término desta
            licença, você deve apagar todos os materiais baixados em sua posse,
            seja em formato eletrônico ou impresso.
          </Text>
          <Text>3. Isenção de Responsabilidade</Text>
          <Text>
            Os materiais no aplicativo da SeekTube são fornecidos 'como estão'.
            SeekTube não oferece garantias, expressas ou implícitas, e, por este
            meio, isenta e nega todas as outras garantias, incluindo, sem
            limitação, garantias implícitas ou condições de comercialização,
            adequação a um fim específico ou não violação de propriedade
            intelectual ou outra violação de direitos. Além disso, o SeekTube
            não garante ou faz qualquer representação relativa à precisão, aos
            resultados prováveis ou à confiabilidade do uso dos materiais em seu
            aplicativo ou de outra forma relacionado a esses materiais ou em
            aplicativos vinculados a este aplicativo.
          </Text>
          <Text>4. Limitações</Text>
          <Text>
            Em nenhum caso o SeekTube ou seus fornecedores serão responsáveis
            por quaisquer danos (incluindo, sem limitação, danos por perda de
            dados ou lucro ou devido a interrupção dos negócios) decorrentes do
            uso ou da incapacidade de usar os materiais em SeekTube, mesmo que
            SeekTube ou um representante autorizado da SeekTube tenha sido
            notificado oralmente ou por escrito da possibilidade de tais danos.
            Como algumas jurisdições não permitem limitações em garantias
            implícitas, ou limitações de responsabilidade por danos consequentes
            ou incidentes, essas limitações podem não se aplicar a você.
          </Text>
          <Text>5. Precisão dos materias</Text>
          <Text>
            Os materiais exibidos no aplicativo da SeekTube podem incluir erros
            técnicos, tipográficos ou fotográficos. SeekTube não garante que
            qualquer material em seu aplicativo seja preciso, completo ou atual.
            SeekTube pode fazer alterações nos materiais contidos em seu
            aplicativo a qualquer momento, sem aviso prévio. No entanto,
            SeekTube não se compromete a atualizar os materiais.
          </Text>
          <Text>6. Links</Text>
          <Text>
            O SeekTube não analisou todos os sites vinculados ao seu aplicativo
            e não é responsável pelo conteúdo de nenhum site vinculado. A
            inclusão de qualquer link não implica endosso por SeekTube do site.
            O uso de qualquer site vinculado é por conta e risco do usuário.{" "}
          </Text>
          <Text>7. Modificações</Text>
          <Text>
            O SeekTube pode revisar estes termos de serviço do aplicativo a
            qualquer momento, sem aviso prévio. Ao usar este aplicativo, você
            concorda em ficar vinculado à versão atual destes termos de serviço.
          </Text>
          <Text>8. Lei aplicável</Text>
          <Text>
            Estes termos e condições são regidos e interpretados de acordo com
            as leis do SeekTube e você se submete irrevogavelmente à jurisdição
            exclusiva dos tribunais naquele estado ou localidade.
          </Text>
          <Text>
            9. Utilização de APIs de Terceiros e Conformidade com a LGPD
          </Text>
          <Text>
            Nosso aplicativo de busca utiliza APIs de terceiros para fornecer
            seus serviços. Ao utilizar essas APIs, seguimos rigorosamente os
            termos de uso e políticas de privacidade de cada provedor de API,
            garantindo que todos os dados processados estejam em conformidade
            com a Lei Geral de Proteção de Dados (LGPD). Isso inclui, mas não se
            limita a, coleta, armazenamento e compartilhamento de dados. Ao
            utilizar nosso aplicativo, você também concorda com os termos e
            condições das APIs de terceiros e reconhece que seus dados poderão
            ser processados de acordo com essas políticas.
          </Text>
        </View>
      </Surface>
    </ScrollView>
  );
}
