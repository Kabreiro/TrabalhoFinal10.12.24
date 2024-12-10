const chatController = {
    getChat: (req, res) => {
        const usuarios = [
            { nickname: 'Joao' },
            { nickname: 'Julio' },
            { nickname: 'Carol' }
        ]; // Substitua por dados reais, se possível

        // Exemplo de mensagens para exibição na página
        const mensagens = [
            { usuario: 'Joao', texto: 'Oi, pessoal!', timestamp: '2024-12-10 10:00' },
            { usuario: 'Julio', texto: 'Olá, tudo bem?', timestamp: '2024-12-10 10:02' },
            { usuario: 'Carol', texto: 'Oi, Julio!', timestamp: '2024-12-10 10:03' }
        ];

        res.render('chat', { usuarios, mensagens });
    },

    postMensagem: (req, res) => {
        const { usuario, mensagem } = req.body;

        // Verificar se a mensagem está presente
        if (!usuario || !mensagem) {
            return res.status(400).send('Usuário e mensagem são obrigatórios!');
        }

        // Adiciona a nova mensagem (aqui você poderia também salvar no banco de dados)
        const newMessage = { usuario, texto: mensagem, timestamp: new Date().toLocaleString() };

        // Envia a nova mensagem como resposta para o AJAX
        res.json({ usuario, texto: mensagem, timestamp: newMessage.timestamp });
    }
};

module.exports = chatController;
