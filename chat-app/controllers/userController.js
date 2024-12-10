const users = [];  // Usando um array simples como exemplo

module.exports.getCadastro = (req, res) => {
    res.render('cadastroUsuario', { error: null, users });
};

module.exports.postCadastro = (req, res) => {
    const { nome, nascimento, nickname } = req.body;
    
    if (!nome || !nascimento || !nickname) {
        return res.render('cadastroUsuario', { error: 'Todos os campos são obrigatórios!', users });
    }

    users.push({ nome, nascimento, nickname });
    req.session.user = { nome, nickname };  // Salvar na sessão
    res.redirect('/chat.html');
};
