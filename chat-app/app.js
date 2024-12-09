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
const PORT = process.env.PORT || 3000; // Usar a porta do Vercel ou 3000 localmente

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de middlewares para análise de dados e cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware de sessão
app.use(sessionMiddleware);

// Página inicial (após login ou cadastro)
app.get('/', (req, res) => {
    // Verifica se o usuário está autenticado (no caso de login)
    if (req.session.user) {
        res.redirect('/chat.html');
    } else {
        res.redirect('/cadastroUsuario.html');
    }
});

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas públicas
app.get('/cadastroUsuario.html', userController.getCadastro);
app.post('/cadastrarUsuario', userController.postCadastro);

// Rotas protegidas (requer autenticação)
app.get('/chat.html', authMiddleware, chatController.getChat);
app.post('/postarMensagem', authMiddleware, chatController.postMensagem);

// Página inicial (redireciona para o cadastro de usuários)
app.get('/', (req, res) => {
    res.redirect('/cadastroUsuario.html');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

