import React from "react";
import { View} from "react-native";
import { Surface, Avatar, Title, Text, Button } from "react-native-paper";
import styles from "../config/styles";

export default function ProfileScreen() {

  return (
    <Surface style={styles.container}>
      {/* Avatar do perfil */}
      <Avatar.Image 
        size={120} 
        source={{ uri: "https://example.com/profile-image.jpg" }} 
        style={styles.avatar}
      />

      {/* Nome do usuário */}
      <Title style={styles.title}>Nome do Usuário</Title>
      
      {/* Email do usuário */}
      <Text style={styles.email}>usuario@exemplo.com</Text>

      {/* Botão de edição do perfil */}
      <Button
        mode="contained"
        onPress={() => console.log("Editar Perfil")}
        style={styles.editButton}
      >
        Editar Perfil
      </Button>

      {/* Botão de logout */}
      <Button
        mode="outlined"
        onPress={() => console.log("Logout")}
        style={styles.logoutButton}
      >
        Logout
      </Button>

    </Surface>
  );
}