let users = [];  // Lista de usuários cadastrados

const userController = {
    getCadastro: (req, res) => {
        res.render('cadastroUsuario', { users });  // Passa a lista de usuários para a página de cadastro
    },

    postCadastro: (req, res) => {
        const { nome, nascimento, nickname } = req.body;

        // Verifica se os dados do formulário estão presentes
        if (!nome || !nascimento || !nickname) {
            return res.status(400).send('Todos os campos são obrigatórios!');
        }

        // Simula a criação de um novo usuário
        const newUser = { id: users.length + 1, nome, nascimento, nickname };
        users.push(newUser);  // Adiciona o novo usuário à lista de usuários

        // Após o cadastro, redireciona de volta para a página de cadastro
        res.redirect('/cadastroUsuario');  // Retorna para a página de cadastro, agora com o novo usuário na lista
    },

    login: (req, res) => {
        const { nickname } = req.body;

        // Verifica se o usuário existe na lista
        const user = users.find(u => u.nickname === nickname);

        if (user) {
            // Armazena o ID do usuário na sessão
            req.session.userId = user.id;
            res.redirect('/chat');  // Redireciona para a página do chat após o login
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    },

    logout: (req, res) => {
        // Limpa a sessão
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Erro ao destruir sessão');
            }
            res.clearCookie('userId');
            res.status(200).send('Logout bem-sucedido');
        });
    }
};

module.exports = userController;
