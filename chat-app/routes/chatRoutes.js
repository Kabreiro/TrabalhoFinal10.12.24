const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Rota para exibir a página de bate-papo
router.get('/chat', chatController.getChat);

// Rota para postar uma mensagem
router.post('/postarMensagem', chatController.postMensagem);

module.exports = router;
