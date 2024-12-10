// middleware/authMiddleware.js
module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redireciona se o usuário não estiver autenticado
    }
    next(); // Permite o acesso à rota
};
