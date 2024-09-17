import { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import styles from "../config/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs"; // Add this line

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dtnasc, setDtNasc] = useState("");
  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState("");
  const [err, setError] = useState("");

  async function validateForm() {
    if (password !== confirmPassword) {
      setError("As senhas não conferem");
      return false;
    }
    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      return false;
    }
    if (nome.length < 3) {
      setError("O nome deve ter no mínimo 3 caracteres");
      return false;
    }
    if (dtnasc.length < 10) {
      setError("A data de nascimento deve ter no mínimo 10 caracteres");
      return false;
    }
    if (estado.length < 2) {
      setError("O estado deve ter no mínimo 2 caracteres");
      return false;
    }
    if (!validateEmail(email)) {
      setError("E-mail inválido");
      return false;
    }
    return true;
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

      const hashedPassword = await bcrypt.hash(password, 10);
      const collectionRef = collection(db, "usuarios");
      await setDoc(
        doc(
          collectionRef, 
          user.uid),
           {
        email: email,
        estado: estado,
        dtnasc: dtnasc,
        nome: nome,
        password: hashedPassword, // Store hashed password
      });
    } catch (err) {
      setError("Erro no registro");
    }
  }

  function mkRegister() {
    if (validateForm()) {
      firebaseRegister();
      navigation.navigate("Login");
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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

            <Text style={styles.inputxt}>Nome:</Text>
            <TextInput
              placeholder="Coloque seu Nome"
              onChangeText={setNome}
              value={nome}
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />

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

            <Text style={styles.inputxt}>Data de Nascimento:</Text>
            <TextInput
              placeholder="Ex: dd/mm/aaaa"
              onChangeText={setDtNasc}
              value={dtnasc}
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
            <Text style={styles.inputxt}>Estado:</Text>
            <TextInput
              placeholder="Coloque seu Estado"
              onChangeText={setEstado}
              value={estado}
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />

            <Button
              onPress={mkRegister}
              mode="contained-tonal"
              style={styles.button}
            >
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

