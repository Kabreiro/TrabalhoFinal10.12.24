const messages = []; // Array para armazenar as mensagens (em memória)

exports.getChat = (req, res) => {
    const error = req.query.error || null; // Captura mensagens de erro, se houver
    res.render('chat', { users, messages, error });
};

exports.postMensagem = (req, res) => {
    const { usuario, mensagem } = req.body;

    // Validação dos dados
    if (!usuario || !mensagem.trim()) {
        return res.redirect('/chat.html?error=Selecione um usuário e preencha a mensagem!');
    }

    // Adiciona a mensagem ao array com data e hora
    messages.push({
        usuario,
        mensagem,
        timestamp: new Date(),
    });

    res.redirect('/chat.html');
};
