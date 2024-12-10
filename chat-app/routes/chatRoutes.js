const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/chat', authMiddleware, chatController.getChat); 
router.post('/postarMensagem', authMiddleware, chatController.postMensagem); 

module.exports = router;
