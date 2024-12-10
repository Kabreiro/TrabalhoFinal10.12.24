const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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

// Middleware de sessão
app.use(session({
  secret: 'seu_segredo_aqui',  // Defina um segredo seguro
  resave: false,
  saveUninitialized: true
}));

// Middleware personalizado de sessão, se necessário
app.use(sessionMiddleware);

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Certifique-se de que o caminho está correto

// Rota principal e página inicial
app.get('/', (req, res) => {
  // Se a sessão não existe, cria uma
  if (!req.session.views) {
    req.session.views = 1;
    return res.send('<p>Bem-vindo à sua primeira visita!</p>');
  }

  // Incrementa o contador de visualizações a cada visita
  req.session.views++;
  // Redireciona para o chat se o usuário estiver logado, caso contrário para o cadastro
  if (req.session.userId) {
    return res.redirect('/chat.html');
  }
  return res.redirect('/cadastroUsuario');
});

// Definição das rotas de cadastro e chat
app.get('/cadastroUsuario', userController.getCadastro);
app.post('/cadastrarUsuario', userController.postCadastro);
app.get('/chat.html', authMiddleware, chatController.getChat);
app.post('/postarMensagem', authMiddleware, chatController.postMensagem);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
