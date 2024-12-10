const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do cookie-parser
app.use(cookieParser());

// Configuração do express-session
app.use(session({
    secret: 'secreta-chave-de-sessao', // Alterar para uma chave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina 'true' se estiver usando HTTPS
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usuários de exemplo (em vez de banco de dados SQL, usaremos um objeto)
const users = [
    { id: 1, nickname: 'user1', password: '12345', name: 'João', email: 'joao@example.com' },
    { id: 2, nickname: 'user2', password: '67890', name: 'Maria', email: 'maria@example.com' }
];

// Rota para login
app.post('/login', (req, res) => {
    const { nickname, password } = req.body;

    // Verificar se o usuário existe na lista
    const user = users.find(u => u.nickname === nickname && u.password === password);

    if (user) {
        // Armazenar o ID do usuário na sessão e criar um cookie
        req.session.userId = user.id;
        res.cookie('userId', user.id, { maxAge: 900000, httpOnly: true }); // Criar cookie
        res.status(200).send('Usuário autenticado');
    } else {
        res.status(401).send('Credenciais inválidas');
    }
});

// Rota para pegar dados do usuário com base no cookie
app.get('/profile', (req, res) => {
    const userId = req.cookies.userId || req.session.userId;

    if (!userId) {
        return res.status(401).send('Você precisa fazer login');
    }

    // Buscar o usuário da lista pelo ID
    const user = users.find(u => u.id === userId);

    if (user) {
        res.status(200).json(user); // Retorna os dados do usuário
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

// Rota para logout
app.post('/logout', (req, res) => {
    res.clearCookie('userId'); // Limpa o cookie
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao destruir sessão');
        }
        res.status(200).send('Usuário desconectado');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
