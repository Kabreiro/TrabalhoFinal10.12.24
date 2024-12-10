const users = [
    { id: 1, nickname: 'user1', password: '12345', name: 'João', email: 'joao@example.com' },
    { id: 2, nickname: 'user2', password: '67890', name: 'Maria', email: 'maria@example.com' }
];

const userController = {
    getCadastro: (req, res) => {
        res.render('cadastroUsuario'); // Renderiza a página de cadastro
    },

    postCadastro: (req, res) => {
        const { nickname, password, name, email } = req.body;
        const newUser = { id: users.length + 1, nickname, password, name, email };
        users.push(newUser);

        req.session.userId = newUser.id;
        res.cookie('userId', newUser.id, { maxAge: 900000, httpOnly: true });
        res.status(201).send('Usuário criado com sucesso');
    },

    login: (req, res) => {
        const { nickname, password } = req.body;
        const user = users.find(u => u.nickname === nickname && u.password === password);

        if (user) {
            req.session.userId = user.id;
            res.cookie('userId', user.id, { maxAge: 900000, httpOnly: true });
            res.status(200).send('Login bem-sucedido');
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    },

    logout: (req, res) => {
        res.clearCookie('userId');
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Erro ao destruir sessão');
            }
            res.status(200).send('Logout bem-sucedido');
        });
    }
};

module.exports = userController; // Certifique-se de exportar o controlador corretamente
