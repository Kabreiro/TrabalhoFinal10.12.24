const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

// Rota de exibição do chat
router.get('/chat', authMiddleware, chatController.getChat);

// Rota para enviar mensagens no chat
router.post('/postarMensagem', authMiddleware, chatController.postMensagem);

module.exports = router;
