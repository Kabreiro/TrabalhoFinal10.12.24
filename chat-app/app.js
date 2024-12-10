const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Lista de usuários (em memória, você pode substituir por um banco de dados)
let usuarios = [
    { nome: 'Joao', nascimento: '2000-01-01', nickname: 'Joao' },
    { nome: 'Julio', nascimento: '1995-03-15', nickname: 'Julio' },
    { nome: 'Carol', nascimento: '1998-07-20', nickname: 'Carol' }
];

// Lista de mensagens (em memória, você pode substituir por um banco de dados)
let mensagens = [
    { usuario: 'Joao', texto: 'Oi, pessoal!', timestamp: '2024-12-10 10:00' },
    { usuario: 'Julio', texto: 'Olá, tudo bem?', timestamp: '2024-12-10 10:02' },
    { usuario: 'Carol', texto: 'Oi, Julio!', timestamp: '2024-12-10 10:03' }
];

// Configuração de sessão
app.use(session({
    secret: 'BURG',
    resave: false,
    saveUninitialized: true
}));

// Configuração para trabalhar com cookies e dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuração de arquivos estáticos (CSS, JS, etc)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do motor de visualização (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota de cadastro de usuário (exibe o formulário)
app.get('/cadastroUsuario', (req, res) => {
    res.render('cadastroUsuario', { usuarios }); // Renderiza a página de cadastro com a lista de usuários
});

// Rota para cadastrar usuário (salva na lista de usuários)
app.post('/cadastroUsuario', (req, res) => {
    const { nome, nascimento, nickname } = req.body;

    // Verifica se o nickname foi fornecido
    if (!nickname || !nome || !nascimento) {
        return res.status(400).send('Preencha todos os campos!'); // Verifica se todos os campos estão preenchidos
    }

    // Adiciona o novo usuário à lista de usuários
    usuarios.push({ nome, nascimento, nickname });

    // Salvar o nickname na sessão
    req.session.usuario = nickname;

    // Redirecionar para a página de cadastro ou para o chat
    res.redirect('/cadastroUsuario'); // Redireciona de volta para o formulário de cadastro
});

// Rota de chat (exibe o chat com as mensagens)
app.get('/chat', (req, res) => {
    const usuarioLogado = req.session.usuario;
    res.render('chat', { mensagens, usuarioLogado, usuarios });
});

// Rota para enviar mensagens
app.post('/enviarMensagem', (req, res) => {
    const { mensagem } = req.body;

    const usuarioLogado = req.session.usuario;
    if (!usuarioLogado || !mensagem) {
        return res.status(400).send('Usuário e mensagem são obrigatórios!');
    }

    // Criação de uma nova mensagem com timestamp
    const newMessage = {
        usuario: usuarioLogado,
        texto: mensagem,
        timestamp: new Date().toLocaleString()
    };

    mensagens.push(newMessage);

    res.redirect('/chat'); // Redireciona para o chat para atualizar a lista de mensagens
});

// Página inicial ou redirecionamento
app.get('/', (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/chat');
    }
    res.redirect('/cadastroUsuario'); // Redireciona para o formulário de cadastro
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
