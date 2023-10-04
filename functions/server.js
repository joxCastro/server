// functions/server.js
exports.handler = async (event, context) => {
    // Tu lógica de servidor aquí
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

    app.get('/netlify/functions/server/api/categorias', (req, res) => {
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

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hola desde Netlify!' }),
    };
  };