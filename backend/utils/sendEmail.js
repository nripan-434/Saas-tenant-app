import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.SYSTEM_EMAIL,
      pass: process.env.SYSTEM_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: `"AdminPanel" <${process.env.SYSTEM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;