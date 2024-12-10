const session = require('express-session');

module.exports = session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Altere para 'true' se for usar HTTPS
});
