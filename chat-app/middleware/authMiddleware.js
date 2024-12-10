// Middleware de autenticação
module.exports = (req, res, next) => {
    // Verifica se o usuário está autenticado
    if (!req.session.user || !req.session.user.name || !req.session.user.email) {
        // Se não estiver autenticado, redireciona para a página de cadastro ou login
        return res.redirect('/cadastroUsuario.html?error=auth_required');
    }
    
    // Caso esteja autenticado, prossegue com a requisição
    next();
};
