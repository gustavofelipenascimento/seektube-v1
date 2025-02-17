const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config(); // Para carregar a API Key do .env

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

// Middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(express.json()); // Permite receber JSON no body das requisições

// Rota para enviar e-mail
app.post("/send-feedback", async (req, res) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ error: "O campo de feedback é obrigatório." });
  }

  try {
    await resend.emails.send({
      from: "seektubebusiness@seektube.com.br",
      to: "seektubebusiness@seektube.com.br",
      subject: "Novo Feedback do Aplicativo",
      text: `Novo feedback recebido:\n\n${feedback}`,
    });

    res.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Falha ao enviar e-mail." });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
