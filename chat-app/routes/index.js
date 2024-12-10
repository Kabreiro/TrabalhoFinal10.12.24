const express = require('express');
const chatRoutes = require('./chatRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Usar as rotas específicas
router.use('/', userRoutes); // Rotas relacionadas ao cadastro de usuários
router.use('/', chatRoutes); // Rotas relacionadas ao chat

module.exports = router;
