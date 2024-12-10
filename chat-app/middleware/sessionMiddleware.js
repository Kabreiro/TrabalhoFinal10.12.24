// Exemplo de middleware de sessão
const session = require('express-session');

module.exports = session({
    secret: 'seu_segredo_aqui',
    resave: false,
    saveUninitialized: true
});
