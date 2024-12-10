const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Rota GET para exibir a página de chat
router.get('/chat', chatController.getChat);

// Rota POST para enviar uma mensagem
router.post('/enviarMensagem', chatController.postMensagem);

module.exports = router;
