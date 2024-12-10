// controllers/userController.js
const db = require('../config/db'); // Importando a conexão com o banco de dados

module.exports.getCadastro = (req, res) => {
    if (req.session.user) {
        return res.redirect('/chat.html');
    }
    res.render('cadastroUsuario');
};

module.exports.postCadastro = (req, res) => {
    const { nome, nascimento, nickname } = req.body;

    if (!nome || !nascimento || !nickname) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    // Consulta SQL para inserir o novo usuário no banco de dados
    const query = 'INSERT INTO users (nome, nascimento, nickname) VALUES (?, ?, ?)';
    db.query(query, [nome, nascimento, nickname], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao cadastrar o usuário');
        }

        // Salvando o usuário na sessão após cadastro
        req.session.user = { nome, nickname, id: result.insertId };
        res.redirect('/chat.html');
    });
};
