console.log('Starting server...');

// ----------------------
// Load environment
// ----------------------
const path = require('path');
require('dotenv').config();

// ----------------------
// Imports
// ----------------------
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { errors } = require('celebrate');

// ----------------------
// MongoDB Connection Setup
// ----------------------
const useDocker = process.env.USE_DOCKER === 'true';
const MONGO_URI = useDocker
  ? process.env.MONGO_URI_DOCKER
  : process.env.MONGO_URI_LOCAL;

console.log('Connecting to MongoDB...');
console.log('MongoDB URI:', MONGO_URI);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

mongoose.connection.on('connected', () => console.log('MongoDB event: connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB event error:', err));
mongoose.connection.on('disconnected', () => console.log('MongoDB event: disconnected'));

// ----------------------
// Import Routes
// ----------------------
const authRoutes = require('./routes/auth');
const farmerRoutes = require('./routes/farmer');
const livestockRoutes = require('./routes/livestock');
const medicineRoutes = require('./routes/medicine');
const amuLogRoutes = require('./routes/amuLog');
const chatbotRoutes = require('./routes/chatbot');
const blockchainRoutes = require('./routes/blockchain');

// ----------------------
// Import Middleware
// ----------------------
const errorHandler = require('./middleware/errorHandler');

// ----------------------
// Initialize Express App
// ----------------------
const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Swagger docs
const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yaml'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ----------------------
// Routes
// ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/livestock', livestockRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/amuLog', amuLogRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/blockchain', blockchainRoutes);

// Celebrate error handler
app.use(errors());

// Central error handler
app.use(errorHandler);
app.get('/', (req, res) => res.send('Server is running'));
app.get('/test', (req, res) => {
  res.send('Test route working');
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('PORT:', process.env.PORT);
  console.log('MONGO_URI_LOCAL:', process.env.MONGO_URI_LOCAL);
  console.log('USE_DOCKER:', process.env.USE_DOCKER);
  console.log('MONGO_URI_DOCKER:', process.env.MONGO_URI_DOCKER);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

module.exports = app;
