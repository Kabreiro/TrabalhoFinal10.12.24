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
const PORT = process.env.PORT || 3000; // Porta definida pelo Vercel

// Configuração de middlewares para análise de dados e cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Definição de rotas
const routes = require("./routes");
app.use("/", routes);

// Rotas específicas
app.get('/cadastroUsuario.html', userController.getCadastro);
app.post('/cadastrarUsuario', userController.postCadastro);
app.get('/chat.html', authMiddleware, chatController.getChat);
app.post('/postarMensagem', authMiddleware, chatController.postMensagem);

// Página inicial (redireciona para o cadastro ou para o chat)
app.get('/', (req, res) => {
    if (req.session?.user) {
        return res.redirect('/chat.html'); // Se autenticado, redireciona para o bate-papo
    }
    return res.redirect('/cadastroUsuario.html'); // Caso contrário, redireciona para o cadastro
});

// Iniciar o servidor Express na porta especificada
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Exportação para serverless (Vercel)
module.exports = app;
