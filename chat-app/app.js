const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de arquivos estáticos e middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importação das rotas
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Usando as rotas no seu app
app.use("/users", userRoutes); // Prefixo /users para rotas de usuários
app.use("/chat", chatRoutes); // Prefixo /chat para rotas de chat

// Página inicial (redireciona para o cadastro de usuários ou chat, conforme a sessão)
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/chat'); // Redireciona para a página de chat
    }
    return res.redirect('/users/cadastroUsuario'); // Redireciona para o cadastro de usuário
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
