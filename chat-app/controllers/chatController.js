module.exports.getChat = (req, res) => {
    res.render('chat');
};

module.exports.postMensagem = (req, res) => {
    // Lógica para salvar ou enviar mensagem
    res.send('Mensagem enviada');
};
