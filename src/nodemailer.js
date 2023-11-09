import nodemailer from 'nodemailer'
import config from './config.js'

export const sendPasswordResetEmail = async (recipientEmail, token) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
        user: config.gmail_user,
        pass: config.gmail_password,
    },
  });

  const mailOptions = {
    to: recipientEmail,
    subject: 'Recuperación de contraseña',
    text: `Puedes restablecer tu contraseña utilizando este enlace: http://localhost:8080/api/auth/reset-password/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
};
