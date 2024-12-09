function authMiddleware(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next(); // Usuário autenticado, prosseguir
    } else {
        res.redirect('/cadastroUsuario.html'); // Redireciona para a página de login/cadastro
    }
}

module.exports = authMiddleware;
