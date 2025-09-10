const http = require('http');

console.log('Creating server...');

const server = http.createServer((req, res) => {
  console.log('Received request');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is working!');
});

const PORT = 3000;

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
