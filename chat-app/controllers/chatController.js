const chatController = {
    getChat: (req, res) => {
        const usuarios = req.app.locals.users || [];  // Lista de usuários cadastrados (salvo na memória ou banco de dados)
        const mensagens = req.app.locals.mensagens || [];  // Mensagens enviadas no chat (salvo na memória ou banco de dados)

        // Renderiza a página de chat passando usuários e mensagens
        res.render('chat', { usuarios, mensagens });
    },

    postMensagem: (req, res) => {
        const { usuario, mensagem } = req.body;  // Extrai o usuário e a mensagem do formulário

        // Cria um objeto para a nova mensagem com um timestamp
        const novaMensagem = {
            usuario,
            mensagem,
            timestamp: new Date().toLocaleString(),  // Timestamp para mostrar a hora da mensagem
        };

        // Armazena a nova mensagem
        req.app.locals.mensagens = req.app.locals.mensagens || [];
        req.app.locals.mensagens.push(novaMensagem);

        // Após o envio da mensagem, redireciona de volta para o chat
        res.redirect('/chat');
    }
};

module.exports = chatController;
