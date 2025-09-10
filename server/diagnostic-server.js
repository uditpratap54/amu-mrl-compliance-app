const http = require('http');
const net = require('net');

// First, test if the port is available
function testPort(port) {
    return new Promise((resolve, reject) => {
        const tester = net.createServer()
            .once('error', err => {
                if (err.code === 'EADDRINUSE') {
                    console.log(`❌ Port ${port} is already in use`);
                    resolve(false);
                } else {
                    console.log(`❌ Error checking port ${port}:`, err);
                    resolve(false);
                }
            })
            .once('listening', () => {
                tester.once('close', () => resolve(true))
                      .close();
            })
            .listen(port);
    });
}

// Create and start server with better error handling
async function startServer() {
    let PORT = 3000;
    console.log('🔍 Checking port availability...');
    
    const isPortAvailable = await testPort(PORT);
    if (!isPortAvailable) {
        console.log('⚠️ Port 3000 is in use, trying port 8080...');
        PORT = 8080;
        const isAltPortAvailable = await testPort(PORT);
        if (!isAltPortAvailable) {
            console.error('❌ Both ports are in use');
            process.exit(1);
        }
    }

    const server = http.createServer((req, res) => {
        console.log(`📝 Received ${req.method} request to ${req.url}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is working!');
    });

    server.on('error', (err) => {
        console.error('❌ Server error:', err.message);
        if (err.code === 'EACCES') {
            console.error('Permission denied. Try running on a port > 1024');
        }
        if (err.code === 'EADDRINUSE') {
            console.error('Port is already in use');
        }
        process.exit(1);
    });

    try {
        await new Promise((resolve, reject) => {
            server.listen(PORT, '127.0.0.1', () => {
                const addr = server.address();
                console.log('='.repeat(50));
                console.log(`✅ Server is running on http://127.0.0.1:${addr.port}`);
                console.log(`📌 Try accessing:`);
                console.log(`   1. http://localhost:${addr.port}`);
                console.log(`   2. http://127.0.0.1:${addr.port}`);
                console.log('='.repeat(50));
                resolve();
            }).on('error', reject);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    }
}

console.log('🚀 Starting server with diagnostics...');
startServer();
