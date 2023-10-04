// netlify-functions/serverless.js

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000; // Utiliza el puerto proporcionado por Netlify o 3000 de manera predeterminada

// Configura la conexión a la base de datos MySQL
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'empresa27.empresadns.net',
  user: process.env.DB_USER || 'tmcapaci_pagina2',
  password: process.env.DB_PASSWORD || 'lIdLiX&uCVqv',
  database: process.env.DB_NAME || 'tmcapaci_pagina2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
    connection.release(); // Liberar la conexión al pool
  }
});

app.get('/', (req, res) => {
  // Lógica para generar la página principal
  res.send('<html><body><h1>Bienvenido a mi sitio web</h1></body></html>');
});

app.use(cors());
app.use(bodyParser.json());

process.on('uncaughtException', (err) => {
  console.error('Excepción no controlada:', err);
});

// Rutas para tu API
app.get('/netlify/functions/serverless/api/categorias', (req, res) => {
  // Realiza una consulta a la base de datos y devuelve los resultados como JSON
  const consultaSQL = 'SELECT * FROM categorias';

  pool.query(consultaSQL, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(resultados);
    }
  });
});

app.get('/netlify/functions/serverless/api/relatores', (req, res) => {
    // Realiza una consulta a la base de datos y devuelve los resultados como JSON
    const consultaSQL = 'SELECT * FROM relator';
  
    pool.query(consultaSQL, (error, resultados) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(resultados);
      }
    });
  });

app.get('/netlify/functions/serverless/api/cursos', (req, res) => {
  // Realiza una consulta a la base de datos y devuelve los resultados como JSON
  const consultaSQL = 'SELECT cursos.*, categorias.valor AS valorCategoria FROM cursos INNER JOIN categorias ON cursos.idCategoria = categorias.idCategoria';

  pool.query(consultaSQL, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(resultados);
    }
  });
});

app.get('/netlify/functions/serverless/api/relatores/:numero', (req, res) => {
  // Obtén el número de la URL
  const numero = req.params.numero;

  // Asegúrate de que `numero` sea un número entero
  const idRelator = parseInt(numero);

  // Realiza una consulta a la base de datos y devuelve el resultado como JSON
  const consultaSQL = 'SELECT * FROM relator WHERE idRelator = ?';

  pool.query(consultaSQL, [idRelator], (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (resultados.length === 0) {
        // Si no se encontraron resultados, devuelve un mensaje adecuado
        res.status(404).json({ error: 'Relator no encontrado' });
      } else {
        // Devuelve el resultado encontrado
        res.json(resultados[0]);
      }
    }
  });
});

app.get('/netlify/functions/serverless/api/cursos/:numero', (req, res) => {
  // Obtén el número de la URL
  const numero = req.params.numero;

  // Asegúrate de que `numero` sea un número entero
  const idCurso = parseInt(numero);

  // Realiza una consulta a la base de datos y devuelve el resultado como JSON
  const consultaSQL = 'SELECT * FROM cursos WHERE idCurso = ?';

  pool.query(consultaSQL, [idCurso], (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (resultados.length === 0) {
        // Si no se encontraron resultados, devuelve un mensaje adecuado
        res.status(404).json({ error: 'Curso no encontrado' });
      } else {
        // Devuelve el resultado encontrado
        res.json(resultados[0]);
      }
    }
  });
});

app.get('/netlify/functions/serverless/api/cursos/nomRelator/:nombre', (req, res) => {
  // Obtén el nombre de la URL
  const nombre = req.params.nombre;

  // Realiza una consulta a la base de datos y devuelve el resultado como JSON
  const consultaSQL = 'SELECT * FROM cursos WHERE relatorA = ? OR relatorB = ?';

  pool.query(consultaSQL, [nombre, nombre], (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (resultados.length === 0) {
        // Si no se encontraron resultados, devuelve un mensaje adecuado
        res.status(404).json({ error: 'Relator no encontrado en ningún curso' });
      } else {
        // Devuelve todos los cursos encontrados
        res.json(resultados);
      }
    }
  });
});

// Configuración para el correo (nodemailer)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'psudeayuda@gmail.com',
    pass: 'jbip obwg jhiu aoou'
  }
});

// Ruta para enviar correos
app.post('/netlify/functions/serverless/enviar-correo', (req, res) => {
  const { destinatario, asunto, mensaje } = req.body;

  const mailOptions = {
    from: 'psudeayuda@gmail.com',
    to: destinatario,
    cc: 'psudeayuda@gmail.com',
    subject: asunto,
    text: mensaje
  };

  console.log('Mail Option:', mailOptions);

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

// Exporta la aplicación como una función serverless
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};