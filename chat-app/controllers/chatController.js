const mensagens = [];

module.exports.getChat = (req, res) => {
    res.render('chat', { mensagens });
};

module.exports.postMensagem = (req, res) => {
    const { usuario, mensagem } = req.body;

    if (!mensagem || !usuario) {
        return res.redirect('/chat.html');
    }

    mensagens.push({ usuario, texto: mensagem, data: new Date().toISOString() });
    res.redirect('/chat.html');
};
