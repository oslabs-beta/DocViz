const express = require('express');
const path = require('path');
const cors = require('cors');
const containerRoutes = require('./routes/containers');
const indexRoutes = require('./routes/index');
const requestLogger = require('./middlewares/requestLogger');
const globalErrorHandler = require('./middlewares/errorHandler');

const app = express();


// Middleware
app.use(express.json());
// logging req method and url
app.use(cors());
app.use(requestLogger);
// Serves an entire directory of static files
app.use(express.static(path.join(__dirname, '../public')));

// Routers
app.use('/api/containers', containerRoutes);
app.use('/', indexRoutes);

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
