import { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import styles from "../config/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      lastName === ""
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
      const docRef = await setDoc(doc(collectionRef, user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    } catch (err) {
      setError("Erro no registro");
    }
  }

  return (
    <ScrollView>
        <Surface style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              style={styles.image}
              source={require("../img/seektube.png")}
            />

            <Text style={styles.title}>Cadastre-se!</Text>
            

            <Text style={styles.inputxt}>Email:</Text>
            <TextInput
              placeholder="Coloque seu E-mail"
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />

            <Text style={styles.inputxt}>Senha:</Text>
            <TextInput
              placeholder="Coloque sua senha"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              style={styles.input}
               underlineColor="transparent"
              activeUnderlineColor="transparent"
            />

            <Text style={styles.inputxt}>Confirmar Senha:</Text>
            <TextInput
              placeholder="Confirme sua senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
              style={styles.input}
               underlineColor="transparent"
              activeUnderlineColor="transparent"
            />


            <Text style={styles.inputxt}>Nome:</Text>
            <TextInput
              placeholder="Coloque seu nome"
              onChangeText={setFirstName}
              value={firstName}
              style={styles.input}
               underlineColor="transparent"
              activeUnderlineColor="transparent"
            />

            <Text style={styles.inputxt}>Último Nome:</Text>
            <TextInput
              placeholder="Coloque seu último nome"
              onChangeText={setLastName}
              value={lastName}
              style={styles.input}
               underlineColor="transparent"
              activeUnderlineColor="transparent"
            />

            <Button onPress={mkRegister} mode="contained" style={styles.button}>
              Enviar
            </Button>
            <Text style={styles.error}>{err}</Text>
            <Button onPress={() => navigation.navigate("SignIn")}>
              Voltar ao Login
            </Button>

            <Button onPress={() => navigation.navigate("SignIn")}>
              Problemas no Cadastro? Clique aqui!
            </Button>
          </View>
        </Surface>
    </ScrollView>
  );
}
