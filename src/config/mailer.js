import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperación de Contraseña - Ecommerce',
    html: `
      <h2>Recuperación de Contraseña</h2>
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente botón para continuar:</p>
      <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Restablecer Contraseña
      </a>
      <p>Este enlace expirará en 1 hora.</p>
      <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default transporter; 