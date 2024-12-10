// Exemplo de middleware de sessão com boas práticas
const session = require('express-session');

// Usando variável de ambiente para o segredo da sessão
const sessionSecret = process.env.SESSION_SECRET || 'seu_segredo_aqui'; // Coloque um segredo forte ou carregue do ambiente

module.exports = session({
    secret: sessionSecret,
    resave: false,  // Impede que a sessão seja salva se não houver alterações
    saveUninitialized: false,  // Não salva sessões não inicializadas
    cookie: {
        httpOnly: true,  // Impede acesso ao cookie via JavaScript (protege contra XSS)
        secure: process.env.NODE_ENV === 'production',  // Só envia o cookie por HTTPS em produção
        sameSite: 'strict',  // Protege contra CSRF
        maxAge: 1000 * 60 * 60 * 24 * 7  // Expira após 7 dias
    }
});
