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

// -----------------------------------... (tus rutas y lógica de Express)-----------------------------------
// Rutas para tu API
app.get('/api/categorias', (req, res) => {
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
  
  app.get('/api/relatores', (req, res) => {
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
  
    app.get('/api/cursos', (req, res) => {
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
  
    app.get('/api/relatores/:numero', (req, res) => {
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
  
    app.get('/api/cursos/:numero', (req, res) => {
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
  
    app.get('/api/cursos/nomRelator/:nombre', (req, res) => {
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

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};