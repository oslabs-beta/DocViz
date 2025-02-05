const express = require('express');
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const http = require('http');
const { WebSocketServer } = require('ws');
const {
  router: containerRoutes,
  getContainerStats,
} = require('./routes/containers');
const indexRoutes = require('./routes/index');
const requestLogger = require('./middlewares/requestLogger');
const globalErrorHandler = require('./middlewares/errorHandler');

dotenv.config();
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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(requestLogger);
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true })); // creates a session using secret key - prevents unnecessary session saves
// Initialize Passport
app.use(passport.initialize()); // authenticates passport 
app.use(passport.session()); // uses express sessions to integrate passport

// Routers
app.use('/api/containers', containerRoutes);
app.use('/', indexRoutes);

// Global Error Handler
app.use(globalErrorHandler);

module.exports = { app, server }; // Export both app and server for WebSocket
