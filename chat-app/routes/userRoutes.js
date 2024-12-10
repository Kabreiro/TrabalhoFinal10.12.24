const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Rotas relacionadas ao cadastro de usuário
router.get('/cadastroUsuario.html', userController.getCadastro); // Rota para mostrar o formulário de cadastro
router.post('/cadastrarUsuario', userController.postCadastro); // Rota para processar o cadastro do usuário

module.exports = router;
