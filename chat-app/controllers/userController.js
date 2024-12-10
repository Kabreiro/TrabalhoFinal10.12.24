// users.js - Simulando um banco de dados de usuários em memória
let users = [];

const userController = {
    getCadastro: (req, res) => {
        // Renderiza a página de cadastro
        res.render('cadastroUsuario');
    },

    postCadastro: (req, res) => {
        const { nickname, password, name, email } = req.body;

        // Simula a criação de um novo usuário
        const newUser = { id: users.length + 1, nickname, password, name, email };
        users.push(newUser);

        // Armazena o ID do usuário na sessão e no cookie
        req.session.userId = newUser.id;
        res.cookie('userId', newUser.id, { maxAge: 900000, httpOnly: true });

        res.status(201).send('Usuário criado com sucesso');
    },

    login: (req, res) => {
        const { nickname, password } = req.body;

        // Verifica se o usuário existe na lista e as credenciais
        const user = users.find(u => u.nickname === nickname && u.password === password);

        if (user) {
            // Armazena o ID do usuário na sessão e no cookie
            req.session.userId = user.id;
            res.cookie('userId', user.id, { maxAge: 900000, httpOnly: true });
            res.status(200).send('Login bem-sucedido');
        } else {
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
            res.status(200).send('Logout bem-sucedido');
        });
    }
};

module.exports = userController;
