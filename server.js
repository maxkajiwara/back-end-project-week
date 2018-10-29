const express = require('express');

server.use(express.json());

// Middleware
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

// Routes
const noteRoutes = require('./routes/noteRoutes');

server.use('/api/notes', noteRoutes);

module.exports = server;
