const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Importação de middlewares
const sessionMiddleware = require('./middleware/sessionMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

// Controladores
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');

// Inicialização do servidor
const app = express();
const PORT = 3000;

// Middleware para adicionar CSP aos cabeçalhos HTTP
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://vercel.live;");
    next(); // Continue com o processamento da requisição
});

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de middlewares para análise de dados e cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware de sessão
app.use(sessionMiddleware);

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Definição das rotas
app.get('/cadastroUsuario.html', userController.getCadastro);
app.post('/cadastrarUsuario', userController.postCadastro);
app.get('/chat.html', authMiddleware, chatController.getChat);
app.post('/postarMensagem', authMiddleware, chatController.postMensagem);

// Página inicial (redireciona para o cadastro de usuários)
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/chat.html'); // Se autenticado, redireciona para o bate-papo
    }
    return res.redirect('/cadastroUsuario.html'); // Caso contrário, redireciona para o cadastro
});

// Exportando a função serverless
module.exports = (req, res) => {
    app(req, res); // Chama o app Express como função
};
const cspMiddleware = require('../middleware/cspMiddleware');

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
