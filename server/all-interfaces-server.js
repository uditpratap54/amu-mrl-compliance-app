const http = require('http');

console.log('Creating server...');

const server = http.createServer((req, res) => {
  console.log('Received request');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is working!');
});

const PORT = 8080; // Using a different common port
const HOST = '0.0.0.0'; // Bind to all available network interfaces

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
  console.log('You can access it at:');
  console.log(`http://localhost:${PORT}`);
  console.log(`http://127.0.0.1:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
