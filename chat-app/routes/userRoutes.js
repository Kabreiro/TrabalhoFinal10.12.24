const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para o cadastro de usuário
router.get('/cadastroUsuario.html', userController.getCadastro);
router.post('/cadastrarUsuario', userController.postCadastro);

// Rota para login
router.post('/login', userController.login);

// Rota para logout
router.get('/logout', userController.logout);

module.exports = router;
