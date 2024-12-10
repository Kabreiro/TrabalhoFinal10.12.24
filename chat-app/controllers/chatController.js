const chatController = {
    getChat: (req, res) => {
        // Verifica se o usuário está autenticado (se o userId está presente na sessão ou no cookie)
        const userId = req.cookies.userId || req.session.userId;

        if (!userId) {
            return res.status(401).send('Você precisa fazer login para acessar o chat');
        }

        // Caso o usuário esteja autenticado, renderiza a página do chat
        res.render('chat', { userId: userId });
    },

    postarMensagem: (req, res) => {
        // Verifica se o usuário está autenticado
        const userId = req.cookies.userId || req.session.userId;

        if (!userId) {
            return res.status(401).send('Você precisa fazer login para enviar mensagens');
        }

        const { mensagem } = req.body;

        // Lógica para salvar ou exibir a mensagem (simulação de um banco de dados)
        console.log(`Usuário ${userId} enviou a mensagem: ${mensagem}`);

        // Resposta de sucesso
        res.status(200).send('Mensagem enviada com sucesso');
    }
};

module.exports = chatController;
