// userController.js
const usuarios = []; // Aqui armazenamos usuários temporariamente

exports.getCadastro = (req, res) => {
    res.render('cadastroUsuario', { error: null });
};

exports.postCadastro = (req, res) => {
    const { nome, email, senha, nickname } = req.body;

    // Verificação de dados obrigatórios
    if (!nome || !email || !senha || !nickname) {
        return res.render('cadastroUsuario', { error: 'Todos os campos são obrigatórios' });
    }

    // Simula o cadastro do usuário
    usuarios.push({ nome, email, senha, nickname });

    // Armazena o usuário na sessão
    req.session.user = { nome, email };

    // Redireciona para a página de bate-papo
    return res.redirect('/chat.html');
};
