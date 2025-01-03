require('dotenv').config();
const express = require('express');
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const logger = require('./config/logger');
const cors = require('cors');
const { initWebSocket } = require('./websocket/wsServer');

const app = express();
const server = http.createServer(app);  
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
  'http://localhost:3010',
  'http://localhost',//for root-app,
]

// Initialize WebSocket
initWebSocket(server);

// CORS middleware configuration
app.use(cors());

// Middleware
app.use(express.json({limit:'10mb'}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});