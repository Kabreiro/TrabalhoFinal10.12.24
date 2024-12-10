const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Importação de middlewares
const sessionMiddleware = require('../middleware/sessionMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Controladores
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');

const app = express();

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configuração de middlewares para análise de dados e cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware de sessão
app.use(sessionMiddleware);

// Rotas públicas
app.get('/cadastroUsuario.html', userController.getCadastro);
app.post('/cadastrarUsuario', userController.postCadastro);

// Rotas protegidas (requer autenticação)
app.get('/chat.html', authMiddleware, chatController.getChat);
app.post('/postarMensagem', authMiddleware, chatController.postMensagem);

// Página inicial (redireciona para o cadastro de usuários)
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat.html');
    } else {
        res.redirect('/cadastroUsuario.html');
    }
});

// Exporta o aplicativo Express para ser usado pelo Vercel
module.exports = app;
