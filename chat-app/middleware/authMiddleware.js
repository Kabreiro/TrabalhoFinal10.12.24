const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
        return next();  // Se o usuário estiver autenticado, permite continuar
    }
    return res.redirect('/');  // Caso contrário, redireciona para a página inicial
};

module.exports = authMiddleware;
