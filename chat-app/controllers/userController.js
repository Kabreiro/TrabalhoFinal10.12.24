const users = [
    { id: 1, nickname: 'user1', password: '12345', name: 'João', email: 'joao@example.com' },
    { id: 2, nickname: 'user2', password: '67890', name: 'Maria', email: 'maria@example.com' }
];

const userController = {
    getCadastro: (req, res) => {
        // Renderiza a página de cadastro
        res.render('cadastroUsuario'); // Verifique se 'cadastroUsuario' é o nome correto da página
    },

    postCadastro: (req, res) => {
        const { nickname, password, name, email } = req.body;

        // Verifica se o usuário já existe
        const existingUser = users.find(u => u.nickname === nickname || u.email === email);
        if (existingUser) {
            return res.status(400).send('Usuário ou e-mail já está cadastrado');
        }

        // Simula a criação de um novo usuário
        const newUser = { id: users.length + 1, nickname, password, name, email };
        users.push(newUser);

        // Armazena o ID do usuário na sessão e no cookie
        req.session.userId = newUser.id;
        res.cookie('userId', newUser.id, { maxAge: 900000, httpOnly: true });

        // Redireciona o usuário para a página de login ou para o chat
        res.status(201).redirect('/login.html'); // Redireciona para o login
    },

    login: (req, res) => {
        const { nickname, password } = req.body;

        // Verifica se o usuário existe na lista e as credenciais
        const user = users.find(u => u.nickname === nickname && u.password === password);

        if (user) {
            // Armazena o ID do usuário na sessão e no cookie
            req.session.userId = user.id;
            res.cookie('userId', user.id, { maxAge: 900000, httpOnly: true });

            // Redireciona para a página do chat após login bem-sucedido
            res.status(200).redirect('/chat.html');
        } else {
            // Redireciona de volta para a página de login com uma mensagem de erro
            res.status(401).send('Credenciais inválidas');
        }
    },

    logout: (req, res) => {
        // Limpa a sessão e o cookie
        res.clearCookie('userId');
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Erro ao destruir sessão');
            }

            // Redireciona para a página de login após logout
            res.status(200).redirect('/login.html');
        });
    }
};

module.exports = userController;
