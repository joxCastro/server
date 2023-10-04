const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000; // Utiliza el puerto proporcionado por Netlify o 3000 de manera predeterminada

// Configura la conexión a la base de datos MySQL
// ... (tus configuraciones de MySQL)

app.get('/', (req, res) => {
  res.send('<html><body><h1>Bienvenido a mi sitio web</h1></body></html>');
});

app.use(cors());
app.use(bodyParser.json());

// ... (tus rutas y lógica de Express)

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};