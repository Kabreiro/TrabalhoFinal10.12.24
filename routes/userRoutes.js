const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rotas relacionadas ao cadastro
router.get('/cadastroUsuario.html', userController.getCadastro);
router.post('/cadastrarUsuario', userController.postCadastro);

module.exports = router;
