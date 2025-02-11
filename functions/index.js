const functions = require("firebase-functions");
const { Resend } = require("resend");

const resend = new Resend("re_TzCMpXvY_QEQWk4hybbWnpj93XY1QBS8X");

exports.sendFeedbackEmail = functions.firestore
  .document("feedback/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const feedbackText = data.feedback;

    try {
      await resend.emails.send({
        from: "suporte@seudominio.com", // Precisa configurar um domínio verificado
        to: "seuemail@empresa.com",
        subject: "Novo Feedback do Aplicativo",
        text: `Feedback recebido:\n\n${feedbackText}`,
      });

      console.log("E-mail enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  });
