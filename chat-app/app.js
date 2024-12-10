const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userController = require('./controllers/userController');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de sessão
app.use(session({
    secret: 'BURG',
    resave: false,
    saveUninitialized: true
}));

app.get('/cadastroUsuario', userController.getCadastro); // Rota para exibir o formulário de cadastro
app.post('/cadastrarUsuario', userController.postCadastro); // Rota para criar um novo usuário

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
app.set('views', path.join(__dirname, 'views'));

// Página inicial ou redirecionamento
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/chat'); // Redireciona para o chat se o usuário estiver logado
    }
    res.redirect('/cadastroUsuario'); // Redireciona para a página de cadastro se não estiver logado
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
