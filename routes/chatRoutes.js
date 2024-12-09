const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Rotas relacionadas ao bate-papo
router.get('/chat.html', chatController.getChat);
router.post('/postarMensagem', chatController.postMensagem);

module.exports = router;
