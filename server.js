// server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 80; // Puedes usar el puerto que desees

// Configura la conexión a la base de datos MySQL
const dbConfig = {
  host: 'empresa27.empresadns.net',
  user: 'tmcapaci_pagina2',
  password: 'lIdLiX&uCVqv',
  database: 'tmcapaci_pagina2',
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

// Configura CORS para permitir solicitudes desde cualquie lado
app.use(cors());


// Rutas para tu API
app.get('/api/categorias', (req, res) => {
  // Realiza una consulta a la base de datos y devuelve los resultados como JSON
  const consultaSQL = 'SELECT * FROM categorias';

  db.query(consultaSQL, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(resultados);
    }
  });
});

app.get('/api/relatores', (req, res) => {
    // Realiza una consulta a la base de datos y devuelve los resultados como JSON
    const consultaSQL = 'SELECT * FROM relator';
  
    db.query(consultaSQL, (error, resultados) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(resultados);
      }
    });
  });

  app.get('/api/cursos', (req, res) => {
    // Realiza una consulta a la base de datos y devuelve los resultados como JSON
    const consultaSQL = 'SELECT cursos.*, categorias.valor AS valorCategoria FROM cursos INNER JOIN categorias ON cursos.idCategoria = categorias.idCategoria';

    db.query(consultaSQL, (error, resultados) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(resultados);
      }
    });
  });

  app.get('/api/relatores/:numero', (req, res) => {
    // Obtén el número de la URL
    const numero = req.params.numero;
  
    // Asegúrate de que `numero` sea un número entero
    const idRelator = parseInt(numero);
  
    // Realiza una consulta a la base de datos y devuelve el resultado como JSON
    const consultaSQL = 'SELECT * FROM relator WHERE idRelator = ?';
  
    db.query(consultaSQL, [idRelator], (error, resultados) => {
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

  app.get('/api/cursos/:numero', (req, res) => {
    // Obtén el número de la URL
    const numero = req.params.numero;
  
    // Asegúrate de que `numero` sea un número entero
    const idCurso = parseInt(numero);
  
    // Realiza una consulta a la base de datos y devuelve el resultado como JSON
    const consultaSQL = 'SELECT * FROM cursos WHERE idCurso = ?';
  
    db.query(consultaSQL, [idCurso], (error, resultados) => {
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

  app.get('/api/cursos/nomRelator/:nombre', (req, res) => {
    // Obtén el nombre de la URL
    const nombre = req.params.nombre;
  
    // Realiza una consulta a la base de datos y devuelve el resultado como JSON
    const consultaSQL = 'SELECT * FROM cursos WHERE relatorA = ? OR relatorB = ?';
  
    db.query(consultaSQL, [nombre, nombre], (error, resultados) => {
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});

//------------------correo---------------------------------

app.use(bodyParser.json());

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
    cc: 'psudeayuda@gmail.com',
    subject: asunto,
    text: mensaje
  };

  console.log('Mail Option:',mailOptions);

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