const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/cadastroUsuario'); // Redireciona para a página de login ou cadastro se o usuário não estiver autenticado
    }
    next(); // Se o usuário estiver autenticado, segue para a próxima função (rota de chat)
};

module.exports = authMiddleware;
