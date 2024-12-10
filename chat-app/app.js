const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Lista de usuários (em memória, você pode substituir por um banco de dados)
let usuarios = [
    { nickname: 'Joao' },
    { nickname: 'Julio' },
    { nickname: 'Carol' }
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

// Rota de cadastro de usuário
app.get('/cadastroUsuario', (req, res) => {
    res.render('cadastroUsuario', { usuarios }); // Renderiza a página de cadastro com a lista de usuários
});

// Rota para cadastrar usuário e salvar na sessão
app.post('/cadastroUsuario', (req, res) => {
    const { nickname } = req.body;

    if (!nickname) {
        return res.status(400).send('Escolha um nickname!');
    }

    // Adiciona o novo usuário à lista de usuários
    usuarios.push({ nickname });

    // Salvar o nickname na sessão
    req.session.usuario = nickname;

    // Redirecionar para a página de chat após o cadastro
    res.redirect('/chat');
});

// Rota de chat
app.get('/chat', (req, res) => {
    const mensagens = [
        { usuario: 'Joao', texto: 'Oi, pessoal!', timestamp: '2024-12-10 10:00' },
        { usuario: 'Julio', texto: 'Olá, tudo bem?', timestamp: '2024-12-10 10:02' },
        { usuario: 'Carol', texto: 'Oi, Julio!', timestamp: '2024-12-10 10:03' }
    ];

    // Obter o usuário logado da sessão
    const usuarioLogado = req.session.usuario;

    res.render('chat', { mensagens, usuarioLogado, usuarios });
});

// Rota para enviar mensagens
app.post('/enviarMensagem', (req, res) => {
    const { usuario, mensagem } = req.body;

    if (!usuario || !mensagem) {
        return res.status(400).send('Usuário e mensagem são obrigatórios!');
    }

    const newMessage = { usuario, texto: mensagem, timestamp: new Date().toLocaleString() };

    // Aqui você pode adicionar lógica para salvar a mensagem em um banco de dados

    // Envia uma resposta de sucesso
    res.status(200).send(`Mensagem enviada por ${usuario}: ${mensagem}`);
});

// Página inicial ou redirecionamento
app.get('/', (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/chat'); // Redireciona para o chat se o usuário estiver logado
    }
    res.redirect('/cadastroUsuario'); // Redireciona para a página de cadastro se não estiver logado
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
