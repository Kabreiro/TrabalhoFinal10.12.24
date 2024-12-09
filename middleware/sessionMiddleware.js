const session = require('express-session');

const sessionMiddleware = session({
    secret: 'chave-secreta', // Altere para uma chave segura em produção
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }, // Sessão válida por 30 minutos
});

module.exports = sessionMiddleware;
