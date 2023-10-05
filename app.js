const http = require('http');

const hostname = 'empresa27.empresadns.net';//186.64.119.90 192.168.1.182
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Bienbenido al servidor');
})

server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`)
})