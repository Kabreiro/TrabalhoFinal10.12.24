const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware'); // Importando o middleware de autenticação

const router = express.Router();

// Rotas relacionadas ao bate-papo
router.get('/chat.html', authMiddleware, chatController.getChat); // Adicionando o middleware de autenticação
router.post('/postarMensagem', authMiddleware, chatController.postMensagem); // Adicionando o middleware de autenticação

module.exports = router;
