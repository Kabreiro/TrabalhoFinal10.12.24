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

        // Aqui você pode adicionar lógica para salvar mensagens em um banco de dados ou lista
        const newMessage = { usuario, texto: mensagem, timestamp: new Date().toLocaleString() };

        // Envia uma resposta de sucesso
        res.status(200).send(`Mensagem enviada por ${usuario}: ${mensagem}`);
    }
};

module.exports = chatController;
