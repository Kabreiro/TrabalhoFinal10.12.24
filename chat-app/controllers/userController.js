module.exports.getCadastro = (req, res) => {
    res.render('cadastroUsuario');
};

module.exports.postCadastro = (req, res) => {
    // Lógica para cadastrar o usuário
    // Exemplo fictício
    req.session.user = { name: req.body.name };
    res.redirect('/chat.html');
};
