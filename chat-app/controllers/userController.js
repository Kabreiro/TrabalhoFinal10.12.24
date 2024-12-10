let users = []; // Lista de usuários cadastrados

const userController = {
    getCadastro: (req, res) => {
        // Passa a lista de usuários para a página de cadastro
        res.render('cadastroUsuario', { users });
    },

    postCadastro: (req, res) => {
        // Certifique-se de que os dados estão sendo enviados corretamente
        const { nome, nascimento, nickname } = req.body;

        // Verifica se os dados necessários foram enviados
        if (!nome || !nascimento || !nickname) {
            return res.status(400).send("Por favor, preencha todos os campos!");
        }

        // Simula a criação de um novo usuário
        const newUser = { id: users.length + 1, nome, nascimento, nickname };
        users.push(newUser); // Adiciona o novo usuário à lista de usuários

        // Armazena o ID do usuário na sessão
        req.session.userId = newUser.id;

        // Após o cadastro, redireciona para a página de chat
        res.redirect('/chat');
    },

    login: (req, res) => {
        const { nickname } = req.body;

        // Verifica se o usuário existe na lista
        const user = users.find(u => u.nickname === nickname);

        if (user) {
            // Armazena o ID do usuário na sessão
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
