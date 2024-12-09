function authMiddleware(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next(); // Usuário autenticado, prosseguir
    } else {
        res.redirect('/cadastroUsuario.html'); // Redireciona para a página de login/cadastro
    }
}

module.exports = authMiddleware;

module.exports = (req, res, next) => {
    if (!req.session.user) {
        // Se o usuário não estiver autenticado, redireciona para o login
        return res.redirect('/cadastroUsuario.html');
    }
    next(); // Caso contrário, continua com a requisição
};