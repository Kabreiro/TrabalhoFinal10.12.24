// controllers/chatController.js
const db = require('../config/db'); // Importando a conexão com o banco de dados

module.exports.getChat = (req, res) => {
    // Consulta para obter todas as mensagens e informações dos usuários
    const query = 'SELECT m.message, m.timestamp, u.nome, u.nickname FROM messages m JOIN users u ON m.user_id = u.id ORDER BY m.timestamp DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao carregar as mensagens');
        }

        // Renderizando a página de chat com as mensagens
        res.render('chat', { messages: results });
    });
};

module.exports.postMensagem = (req, res) => {
    const { message } = req.body;
    const userId = req.session.user.id; // Obtendo o ID do usuário da sessão

    if (!message) {
        return res.status(400).send('A mensagem não pode ser vazia.');
    }

    // Consulta SQL para inserir a nova mensagem
    const query = 'INSERT INTO messages (user_id, message) VALUES (?, ?)';
    db.query(query, [userId, message], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao postar a mensagem');
        }

        res.redirect('/chat.html'); // Redireciona para o chat após postar a mensagem
    });
};
