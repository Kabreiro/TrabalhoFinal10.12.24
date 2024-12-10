const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes'); // Importando rotas de usuário
const chatRoutes = require('./routes/chatRoutes'); // Importando rotas de chat
const authMiddleware = require('./middleware/authMiddleware'); // Middleware de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do middleware de sessão
app.use(session({
    secret: 'seu_segredo_aqui', // Coloque um segredo seguro
    resave: false,
    saveUninitialized: true
}));

// Configuração para trabalhar com cookies e dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usando as rotas de usuário e chat
app.use(userRoutes); // Roteia as rotas de usuário
app.use(chatRoutes); // Roteia as rotas de chat

// Configuração do motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Certifique-se de que o caminho está correto

// Página inicial ou redirecionamento
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/chat');
    }
    res.redirect('/cadastroUsuario');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
