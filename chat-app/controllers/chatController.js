// chatController.js
const mensagens = []; // Lista de mensagens temporária

exports.getChat = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/'); // Redireciona para o cadastro caso o usuário não esteja autenticado
    }

    res.render('chat', {
        mensagens,
        usuario: req.session.user,
        error: null
    });
};

exports.postMensagem = (req, res) => {
    const { usuario, mensagem } = req.body;

    // Validação para garantir que o campo usuário e mensagem não estejam vazios
    if (!usuario || !mensagem) {
        return res.render('chat', { mensagens, error: 'Usuário e mensagem são obrigatórios!' });
    }

    // Adiciona a mensagem à lista
    mensagens.push({
        usuario,
        texto: mensagem,
        data: new Date().toLocaleString(),
    });

    // Exibe novamente o chat com as mensagens
    res.render('chat', {
        mensagens,
        usuario: req.session.user,
        error: null
    });
};
