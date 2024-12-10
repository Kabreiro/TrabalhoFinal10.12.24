const express = require('express');
const router = express.Router(); // Cria a instância do roteador
const userController = require('../controllers/userController'); // Certifique-se de que o caminho está correto

// Definindo as rotas
router.get('/cadastroUsuario', userController.getCadastro); // Rota para o cadastro
router.post('/cadastrarUsuario', userController.postCadastro); // Rota para criar usuário
router.post('/login', userController.login); // Rota para login
router.post('/logout', userController.logout); // Rota para logout

module.exports = router;
