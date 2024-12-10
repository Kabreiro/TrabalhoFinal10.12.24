// sessionMiddleware.js
module.exports = (req, res, next) => {
  // Usando uma sessão simples em memória
  if (!req.session) {
      req.session = {}; // Inicializando sessão em memória se não existir
  }

  // Se o usuário não estiver logado, redireciona para o login
  if (!req.session.user) {
      return res.redirect('/login');
  }

  next();
};
