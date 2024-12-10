const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');

// Criação do aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de arquivos estáticos e middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos como CSS, JS, imagens, etc.
app.use(express.urlencoded({ extended: true })); // Middleware para lidar com formulários
app.use(cookieParser()); // Middleware para ler cookies
app.use(sessionMiddleware); // Middleware para gerenciar sessões

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Certifique-se de que o caminho está correto

// Definição de rotas diretamente
app.get('/cadastroUsuario', userController.getCadastro); // Rota para exibir o formulário de cadastro
app.post('/cadastrarUsuario', userController.postCadastro); // Rota para processar o cadastro
app.get('/chat.html', authMiddleware, chatController.getChat); // Rota para exibir o chat (apenas para usuários autenticados)
app.post('/postarMensagem', authMiddleware, chatController.postMensagem); // Rota para postar mensagens no chat

// Importação das rotas
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Usando as rotas no aplicativo
app.use("/users", userRoutes); // Prefixo /users para rotas de usuários
app.use("/chat", chatRoutes); // Prefixo /chat para rotas de chat

// Página inicial - redireciona com base na autenticação
app.get('/', (req, res) => {
    // Se o usuário estiver autenticado (tiver um id de sessão), redireciona para o chat
    if (req.session.userId) {
        return res.redirect('/chat'); // Redireciona para a página de chat
    }
    return res.redirect('/cadastroUsuario'); // Caso contrário, redireciona para a página de cadastro
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
