const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');
const {
  router: containerRoutes,
  getContainerStats,
} = require('./routes/containers');
const indexRoutes = require('./routes/index');
const requestLogger = require('./middlewares/requestLogger');
const globalErrorHandler = require('./middlewares/errorHandler');

const app = express();

// Create HTTP server for WebSocket support
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  const urlParams = new URL(req.url, `ws://${req.headers.host}`).pathname.split(
    '/'
  );
  const containerId = urlParams[urlParams.length - 1];

  console.log(`New WebSocket connection for container ID: ${containerId}`);

  const sendStats = async () => {
    try {
      const containers = await getContainerStats();
      const containerStats = containers.find(
        (container) => container.id === containerId
      );
      if (containerStats) {
        ws.send(JSON.stringify(containerStats)); // Send stats for specific container
      } else {
        ws.send(JSON.stringify({ error: 'Container not found' }));
      }
    } catch (error) {
      console.error('Error sending stats:', error.message);
      ws.send(JSON.stringify({ error: 'Failed to fetch Docker stats' }));
    }
  };

  const statsInterval = setInterval(sendStats, 5000);

  ws.on('close', () => {
    clearInterval(statsInterval);
    console.log('WebSocket connection closed');
  });
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static(path.join(__dirname, '../public')));

// Routers
app.use('/api/containers', containerRoutes);
app.use('/', indexRoutes);

// Global Error Handler
app.use(globalErrorHandler);

module.exports = { app, server }; // Export both app and server for WebSocket
