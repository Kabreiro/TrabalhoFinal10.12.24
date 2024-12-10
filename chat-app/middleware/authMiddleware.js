// Exemplo de middleware de autenticação
module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/cadastroUsuario.html');
    }
    next();
};
