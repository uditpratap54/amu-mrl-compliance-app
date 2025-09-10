const express = require('express');
const app = express();

// Add more console logs for clarity
console.log('Starting test server...');

app.get('/', (req, res) => {
  console.log('Received request to /');
  res.send('Hello World!');
});

const PORT = 3000; // Changed to a commonly used port
const HOST = 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log('==================================');
  console.log(`🚀 Test server is running!`);
  console.log(`📍 URL: http://${HOST}:${PORT}`);
  console.log('==================================');
}).on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
});
