import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { styles } from "../config/style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCEP] = useState("");
  const [publicspace, setPublicSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [err, setError] = useState("");

  function mkRegister() {
    console.log("Register");
    firebaseRegister();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      firstName === "" ||
      lastName === "" ||
      city === "" ||
      state === "" ||
      cep === "" ||
      publicspace === ""
    ) {
      setError("Preencha todos os campos");
    } else if (password.length < 7) {
      setError("A senha tem que ter no mínimo 8 digitos");
    } else if (password.indexOf(" ") >= 0) {
      setError("A senha não pode conter espaços");
    } else if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {
      setError("E-mail Invalido");
    } else if (email.indexOf(" ") >= 0) {
      setError("E-mail não pode conter espaços");
    } else {
      navigation.navigate("Login");
    }
  }

  async function firebaseRegister() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Usuario Registrado", user);

      const collectionRef = collection(db, "usuarios");
      const docRef = await setDoc(doc(collectionRef, user.uid),
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      cep: cep,
      publicSpace: publicspace,
      neighborhood: neighborhood,
      city: city,
      state: state,
    }
  );
    } catch (err) {
      setError("Erro no registro");
    }
  }

  function searchCEP() {
    console.log("SearchCEP");
    let cleancep = cep.replace("-", "").trim();
    fetch(`https://viacep.com.br/ws/${cleancep}/json/`)
      .then((res) => res.json())
      .then((dados) => {
        setCEP(dados.cep);
        setPublicSpace(dados.logradouro);
        setNeighborhood(dados.bairro);
        setCity(dados.localidade);
        setState(dados.uf);
        console.log(dados);
      })
      .catch((err) => {
        console.log(err);
        StorageError("CEP não encontrado");
      });
  }

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="Coloque seu E-mail"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Coloque sua senha"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirme sua senha"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Coloque seu nome"
            onChangeText={setFirstName}
            value={firstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Coloque seu ultimo nome"
            onChangeText={setLastName}
            value={lastName}
            style={styles.input}
          />
          <Text variant="headlineSmall">Personal data</Text>
          <TextInput
            placeholder="Coloque seu CEP"
            onChangeText={setCEP}
            value={cep}
            keyboardType="numeric"
            onBlur={searchCEP}
            style={styles.input}
            maxLength={8}
          />
          <TextInput
            placeholder="Coloque seu bairro"
            onChangeText={setNeighborhood}
            value={neighborhood}
            style={styles.input}
          />
          <TextInput
            placeholder="Coloque seu logradouro"
            onChangeText={setPublicSpace}
            value={publicspace}
            style={styles.input}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Coloque sua cidade"
              onChangeText={setCity}
              value={city}
              style={{
                ...styles.input,
                width: "69%",
              }}
            />
            <TextInput
              placeholder="Estado"
              onChangeText={setState}
              value={state}
              style={{
                ...styles.input,
                width: "30%",
              }}
            />
          </View>
          <Button onPress={mkRegister} mode="outlined">
            Registrar
          </Button>
          <Text style={styles.error}>{err}</Text>
          <Button onPress={() => navigation.navigate("Login")}>
            Voltar ao Login
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
}