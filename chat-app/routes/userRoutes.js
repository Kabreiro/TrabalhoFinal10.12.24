const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/userController'); 

// Rota de cadastro
router.get('/cadastroUsuario', userController.getCadastro); 
router.post('/cadastrarUsuario', userController.postCadastro); 
router.post('/login', userController.login); 
router.post('/logout', userController.logout); 

module.exports = router;
