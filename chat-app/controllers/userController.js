const users = []; // Array para armazenar os usuários (em memória)

exports.getCadastro = (req, res) => {
    const error = req.query.error || null; // Captura mensagens de erro, se houver
    res.render('cadastroUsuario', { users, error });
};

exports.postCadastro = (req, res) => {
    const { nome, nascimento, nickname } = req.body;

    // Validação simples dos dados
    if (!nome || !nascimento || !nickname) {
        return res.redirect('/cadastroUsuario.html?error=Preencha todos os campos!');
    }

    // Verifica se o nickname já foi cadastrado
    const userExists = users.some(user => user.nickname === nickname);
    if (userExists) {
        return res.redirect('/cadastroUsuario.html?error=Nickname já está em uso!');
    }

    // Adiciona o usuário ao array
    users.push({ nome, nascimento, nickname });
    res.redirect('/cadastroUsuario.html');
};
