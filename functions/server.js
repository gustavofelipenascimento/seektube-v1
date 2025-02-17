const express = require("express");
const { Resend } = require("resend");
const cors = require("cors");
require("dotenv").config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY); // 🔹 Pega a chave do .env

app.use(express.json());
app.use(cors()); // 🔹 Permite chamadas do React Native

app.post("/send-feedback", async (req, res) => {
  const { feedback } = req.body;

  if (!feedback || feedback.trim() === "") {
    return res.status(400).json({ error: "O campo de feedback não pode estar vazio." });
  }

  try {
    await resend.emails.send({
      from: "seektubebusiness@seektube.com.br", // 🔹 O Remetente DEVE ser um domínio verificado
      to: "seektubebusiness@seektube.com.br", // 🔹 Para onde o feedback será enviado
      subject: "Novo Feedback do Aplicativo",
      text: `Feedback recebido:\n\n${feedback}`,
    });

    res.status(200).json({ message: "Feedback enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Erro ao enviar feedback." });
  }
});

// 🔹 Definir porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
