const express = require('express');
const path = require('path');
const containerRoutes = require('./routes/containers');
const indexRoutes = require('./routes/index');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);
app.use(express.static(path.join(__dirname, '../public')));

// Routers
app.use('/api/containers', containerRoutes);
app.use('/', indexRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
