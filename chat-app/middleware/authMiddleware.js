module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/cadastroUsuario.html');  // Caso não esteja autenticado
    }
    next();  // Usuário autenticado, permite continuar
};
