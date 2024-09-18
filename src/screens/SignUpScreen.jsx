import { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import styles from "../config/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dtnasc, setDtNasc] = useState("");
  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState("");
  const [err, setError] = useState("");

  const estados = [
    { label: "Selecione seu estado", value: "" },
    { label: "AC - Acre", value: "AC" },
    { label: "AL - Alagoas", value: "AL" },
    { label: "AP - Amapá", value: "AP" },
    { label: "AM - Amazonas", value: "AM" },
    { label: "BA - Bahia", value: "BA" },
    { label: "CE - Ceará", value: "CE" },
    { label: "DF - Distrito Federal", value: "DF" },
    { label: "ES - Espírito Santo", value: "ES" },
    { label: "GO - Goiás", value: "GO" },
    { label: "MA - Maranhão", value: "MA" },
    { label: "MT - Mato Grosso", value: "MT" },
    { label: "MS - Mato Grosso do Sul", value: "MS" },
    { label: "MG - Minas Gerais", value: "MG" },
    { label: "PA - Pará", value: "PA" },
    { label: "PB - Paraíba", value: "PB" },
    { label: "PR - Paraná", value: "PR" },
    { label: "PE - Pernambuco", value: "PE" },
    { label: "PI - Piauí", value: "PI" },
    { label: "RJ - Rio de Janeiro", value: "RJ" },
    { label: "RN - Rio Grande do Norte", value: "RN" },
    { label: "RS - Rio Grande do Sul", value: "RS" },
    { label: "RO - Rondônia", value: "RO" },
    { label: "RR - Roraima", value: "RR" },
    { label: "SC - Santa Catarina", value: "SC" },
    { label: "SP - São Paulo", value: "SP" },
    { label: "SE - Sergipe", value: "SE" },
    { label: "TO - Tocantins", value: "TO" },
  ];

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
    if (estado === "") {
      setError("Selecione um estado");
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

      const hashedPassword = await bcrypt.hash(password, 10);
      const collectionRef = collection(db, "usuarios");
      await setDoc(doc(collectionRef, user.uid), {
        email: email,
        estado: estado,
        dtnasc: dtnasc,
        nome: nome,
        password: hashedPassword,
      });

      navigation.navigate("SignIn");
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "O e-mail fornecido é inválido.";
          break;
        case "auth/email-already-in-use":
          errorMessage =
            "Este e-mail já está em uso. Tente usar um e-mail diferente.";
          break;
        case "auth/weak-password":
          errorMessage = "A senha deve ter pelo menos 6 caracteres.";
          break;
        case "auth/missing-password":
          errorMessage = "A senha é obrigatória.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Não é possível realizar a operação solicitada.";
          break;
        case "auth/user-disabled":
          errorMessage =
            "A conta foi desativada. Entre em contato com o suporte.";
          break;
        case "auth/user-not-found":
          errorMessage = "Nenhum usuário encontrado com esse e-mail.";
          break;
        case "auth/wrong-password":
          errorMessage = "Senha incorreta.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Problema na conexão de rede. Tente novamente.";
          break;
        default:
          errorMessage = "Ocorreu um erro desconhecido. Tente novamente.";
      }
      setError(errorMessage);
    }
  }

  function mkRegister() {
    if (validateForm()) {
      firebaseRegister();
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function handleDateChange(text) {
    let formattedText = text.replace(/\D/g, ""); // Remove tudo que não for número se tirar eu mato
    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
    }
    if (formattedText.length > 5) {
      formattedText =
        formattedText.slice(0, 5) + "/" + formattedText.slice(5, 9);
    }
    setDtNasc(formattedText);
  }

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <View style={styles.innerContainer}>
          <Image style={styles.image} source={require("../img/seektube.png")} />
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
            placeholder="dd/mm/yyyy"
            onChangeText={handleDateChange}
            value={dtnasc}
            keyboardType="numeric"
            style={styles.input}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            maxLength={10}
          />

          <Text style={styles.inputxt}>Estado:</Text>
          <Picker
            selectedValue={estado}
            onValueChange={(itemValue) => setEstado(itemValue)}
          >
            {estados.map((estado) => (
              <Picker.Item
                label={estado.label}
                value={estado.value}
                key={estado.value}
              />
            ))}
          </Picker>

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
