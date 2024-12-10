module.exports.getChat = (req, res) => {
    // Verifique se o usuário está autenticado
    const usuarios = userModel.getUsers(); // Obtém os usuários
    const mensagens = messageModel.getMessages(); // Obtém as mensagens
    if (!req.session.user) {
        return res.redirect('/cadastroUsuario.html'); // Redireciona caso o usuário não esteja autenticado
    }

    // Renderiza a página do chat, enviando o usuário logado para o EJS
    res.render('chat', { user: req.session.user });
};

module.exports.postMensagem = (req, res) => {
    // Verifique se o usuário está autenticado antes de permitir o envio de mensagens
    if (!req.session.user) {
        return res.status(401).send('Você precisa estar autenticado para enviar mensagens.');
    }
    res.redirect('/chat.html');
    // Lógica para salvar ou processar a mensagem
    const mensagem = req.body.message;
    
    // Verifique se a mensagem foi fornecida
    if (!mensagem || mensagem.trim() === '') {
        return res.status(400).send('A mensagem não pode ser vazia.');
    }

    // Aqui você pode adicionar a lógica de salvar a mensagem, como em um banco de dados.
    // Como exemplo, vamos armazenar a mensagem na sessão (apenas como exemplo temporário).
    if (!req.session.messages) {
        req.session.messages = []; // Inicializa o array de mensagens se não existir
    }

    req.session.messages.push({
        user: req.session.user.name, // Nome do usuário que enviou a mensagem
        message: mensagem,
        timestamp: new Date() // Armazena a data e hora da mensagem
    });

    // Envie uma resposta de sucesso
    res.send('Mensagem enviada com sucesso!');
};
