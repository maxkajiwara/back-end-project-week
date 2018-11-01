const express = require('express');
const server = express();

server.use(express.json());

// Middleware
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

// Routes
const noteRoutes = require('./routes/noteRoutes');
const tagRoutes = require('./routes/tagRoutes');

server.use('/api/notes', noteRoutes);
server.use('/api/tags', tagRoutes);

module.exports = server;
