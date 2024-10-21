import { ScrollView, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import styles from "../config/styles";

export default function PrivacidadeScreen() {
  return (
    <ScrollView>
      <Surface style={styles.container}>
        <View>
          <Text style={styles.titleUso}>Política de Privacidade</Text>

          <Text style={styles.separator}></Text>

          <Text style={styles.sub}>1. Sobre nossos termos</Text>
          <Text style={styles.parag}>
            A sua privacidade é importante para nós. É política do SeekTube
            respeitar a sua privacidade em relação a qualquer informação sua que
            possamos coletar no aplicativo SeekTube, e outros serviços que
            possuímos e operamos. Solicitamos informações pessoais apenas quando
            realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo
            por meios justos e legais, com o seu conhecimento e consentimento.
            Também informamos por que estamos coletando e como será usado.
            Apenas retemos as informações coletadas pelo tempo necessário para
            fornecer o serviço solicitado. Quando armazenamos dados, os
            protegemos dentro de meios comercialmente aceitáveis para evitar
            perdas e roubos, bem como acesso, divulgação, cópia, uso ou
            modificação não autorizados. Não compartilhamos informações de
            identificação pessoal publicamente ou com terceiros, exceto quando
            exigido por lei. O nosso aplicativo pode ter links para sites
            externos que não são operados por nós. Esteja ciente de que não
            temos controle sobre o conteúdo e práticas desses sites e não
            podemos aceitar responsabilidade por suas respectivas políticas de
            privacidade. Você é livre para recusar a nossa solicitação de
            informações pessoais, entendendo que talvez não possamos fornecer
            alguns dos serviços desejados. O uso continuado de nosso aplicativo
            será considerado como aceitação de nossas práticas em torno de
            privacidade e informações pessoais. Se você tiver alguma dúvida
            sobre como lidamos com dados do usuário e informações pessoais,
            entre em contato conosco. O serviço Google AdSense que usamos para
            veicular publicidade usa um cookie DoubleClick para veicular
            anúncios mais relevantes em toda a Web e limitar o número de vezes
            que um determinado anúncio é exibido para você. Para mais
            informações sobre o Google AdSense, consulte as FAQs oficiais sobre
            privacidade do Google AdSense. Utilizamos anúncios para compensar os
            custos de funcionamento deste aplicativo e fornecer financiamento
            para futuros desenvolvimentos. Os cookies de publicidade
            comportamental usados por este aplicativo foram projetados para
            garantir que você forneça os anúncios mais relevantes sempre que
            possível, rastreando anonimamente seus interesses e apresentando
            coisas semelhantes que possam ser do seu interesse. Vários parceiros
            anunciam em nosso nome e os cookies de rastreamento de afiliados
            simplesmente nos permitem ver se nossos clientes acessaram o
            aplicativo através de um dos sites de nossos parceiros, para que
            possamos creditá-los adequadamente e, quando aplicável, permitir que
            nossos parceiros afiliados ofereçam qualquer promoção que pode
            fornecê-lo para fazer uma compra.
          </Text>
          <Text style={styles.sub}>2. Compromisso do Usuario</Text>
          <Text style={styles.parag}>
            O usuário se compromete a fazer uso adequado dos conteúdos e da
            informação que o SeekTube oferece no aplicativo e com caráter
            enunciativo, mas não limitativo:
            </Text>
            
            <Text style={styles.parag}>
              A) Não se envolver em atividades
            que sejam ilegais ou contrárias à boa fé a à ordem pública;
            </Text>


            <Text style={styles.parag}>
              B) Não
            difundir propaganda ou conteúdo de natureza racista, xenofóbica, Bet
            Nacional ou azar, qualquer tipo de pornografia ilegal, de apologia
            ao terrorismo ou contra os direitos humanos;
            </Text>

            <Text style={styles.parag}>
              C) Não causar danos aos
            sistemas físicos (hardwares) e lógicos (softwares) do SeekTube, de
            seus fornecedores ou terceiros, para introduzir ou disseminar vírus
            informáticos ou quaisquer outros sistemas de hardware ou software
            que sejam capazes de causar danos anteriormente mencionados.
             </Text>

            <Text style={styles.parag}> D) Não
            utilizar scripts de spam e ou malwares para prejudicar o
            funcionamento dos servidores da ferramenta de busca SeekTube.
              </Text>

            <Text style={styles.parag}> 
              E) Não
            utilizar da ferramenta de busca SeekTube para crimes cibernéticos ou
            quaisquer outros usos com intenções de natureza maliciosa. 
            </Text>
   
         
          <Text style={styles.sub}>3. Dados coletados </Text>
          <Text style={styles.parag}>
            É importante ressaltar que o aplicativo SeekTube, no ato do
            cadastro, coleta alguns dados. Sendo os dados coletados e seus
            respectivos fins: Data de nascimento do usuário: esse é um dos dados
            coletados, sendo justificado por motivos legais relacionados à idade
            do usuário e a classificação indicativa dos conteúdos de um
            determinado site que pode ser recomendado pelo algoritmo de busca da
            ferramenta SeekTube. Esse é um dado necessário para garantir a
            segurança do usuário durante o uso do aplicativo SeekTube,
            impossibilitando, por exemplo, que sites de conteúdo impróprio sejam
            enviados para usuários menores de idade. Estado (localização): esse
            dado é necessário para questões de pesquisa e controle
            governamental. Esse dado também pode ser utilizado para o
            aprimoramento do nosso algoritmo de recomendação em relação ao
            conteúdo — personalizado por esses dados — que chega ao usuário.
          </Text>
          <Text style={styles.sub}>4. Mais informações </Text>
          <Text style={styles.parag}>
            Esperemos que esteja esclarecido e, como mencionado anteriormente,
            se houver algo que você não tem certeza se precisa ou não,
            geralmente é mais seguro deixar os cookies ativados, caso interaja
            com um dos recursos que você usa em nosso aplicativo.{" "}
          </Text>
          <Text style={styles.sub}>
            5. Utilização de APIs de Terceiros e Conformidade com a LGPD{" "}
          </Text>
          <Text style={styles.parag}>
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
