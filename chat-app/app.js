const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do cookie-parser e express-session
app.use(cookieParser());
app.use(session({
    secret: 'secreta-chave-de-sessao',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Definir as rotas
app.get('/cadastroUsuario.html', userController.getCadastro);
app.post('/cadastrarUsuario', userController.postCadastro);
app.post('/login', userController.login);
app.post('/logout', userController.logout);

app.get('/chat.html', chatController.getChat);
app.post('/postarMensagem', chatController.postarMensagem);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
