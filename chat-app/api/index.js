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

// Inicialização do servidor Express
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
app.use(session({
    secret: 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Alterar para 'true' se usar HTTPS
}));

// Rota de Cadastro de Usuário
app.get('/cadastroUsuario.html', userController.getCadastro);
app.post('/cadastrarUsuario', userController.postCadastro);

// Rota de Bate-papo, protegida por autenticação
app.get('/chat.html', authMiddleware, chatController.getChat);
app.post('/postarMensagem', authMiddleware, chatController.postMensagem);

// Página inicial
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/chat.html'); // Se autenticado, redireciona para o bate-papo
    }
    return res.redirect('/cadastroUsuario.html'); // Caso contrário, redireciona para o cadastro
});

// A função exportada do Vercel
module.exports = (req, res) => {
    app(req, res); // Chama o app Express no handler
};
