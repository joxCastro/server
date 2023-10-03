const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Configura Nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes usar otros proveedores de correo electrónico aquí
  auth: {
    user: 'psudeayuda@gmail.com',
    pass: 'jbip obwg jhiu aoou'
  }
});

// Ruta para enviar correos
app.post('/enviar-correo', (req, res) => {
  const { destinatario, asunto, mensaje } = req.body;

  const mailOptions = {
    from: 'psudeayuda@gmail.com',
    to: destinatario,
    subject: asunto,
    text: mensaje
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error al enviar el correo.' });
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).json({ mensaje: 'Correo enviado con éxito.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});