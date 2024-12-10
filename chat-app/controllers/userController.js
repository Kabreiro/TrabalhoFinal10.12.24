// userController.js
const usuarios = []; // Armazenando usuários na memória (poderia ser um banco de dados)

exports.getCadastro = (req, res) => {
    res.render('cadastroUsuario', { error: null });
};

exports.postCadastro = (req, res) => {
    const { nome, email, senha, nickname } = req.body;

    // Validação de dados
    if (!nome || !email || !senha || !nickname) {
        return res.render('cadastroUsuario', { error: 'Todos os campos são obrigatórios' });
    }

    // Adiciona o usuário à "base de dados"
    usuarios.push({ nome, email, senha, nickname });

    // Redireciona para o menu de bate-papo
    res.redirect('/');
};
