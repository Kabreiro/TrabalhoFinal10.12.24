const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

// Definindo as rotas de chat
router.get('/chat', authMiddleware, chatController.getChat); // Rota de exibição do chat
router.post('/postarMensagem', authMiddleware, chatController.postMensagem); // Rota para enviar mensagens

module.exports = router;
