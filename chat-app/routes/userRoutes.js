const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Definindo as rotas do usuário
router.get('/cadastroUsuario', userController.getCadastro); // Rota de exibição do cadastro
router.post('/cadastrarUsuario', userController.postCadastro); // Rota para processar cadastro
router.post('/login', userController.login); // Rota para login
router.post('/logout', userController.logout); // Rota para logout

module.exports = router;
