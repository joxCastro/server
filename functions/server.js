// functions/server.js
exports.handler = async (event, context) => {
    // Tu lógica de servidor aquí
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hola desde Netlify!' }),
    };
  };