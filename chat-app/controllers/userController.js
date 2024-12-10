// userController.js

let users = [];  // Lista para armazenar os usuários cadastrados

const userController = {
    getCadastro: (req, res) => {
        // Passando os usuários para a página de cadastro
        res.render('cadastroUsuario', { users });
    },

    postCadastro: (req, res) => {
        const { nome, nascimento, nickname } = req.body;

        // Simula a criação de um novo usuário
        const newUser = { id: users.length + 1, nome, nascimento, nickname };
        users.push(newUser);

        // Armazena o ID do usuário na sessão e no cookie
        req.session.userId = newUser.id;
        res.cookie('userId', newUser.id, { maxAge: 900000, httpOnly: true });

        res.redirect('/cadastroUsuario'); // Redireciona para a página de cadastro com a lista de usuários
    },

    login: (req, res) => {
        const { nickname } = req.body;

        // Verifica se o usuário existe na lista
        const user = users.find(u => u.nickname === nickname);

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
