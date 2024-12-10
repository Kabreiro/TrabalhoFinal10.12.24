const chatController = {
    getChat: (req, res) => {
        const usuarios = [
            { nickname: 'User1' },
            { nickname: 'User2' },
            { nickname: 'User3' }
        ]; // Substitua por dados reais, se possível

        res.render('chat', { usuarios });
    },

    postMensagem: (req, res) => {
        const { usuario, mensagem } = req.body;
        
        // Verificar se a mensagem está presente
        if (!usuario || !mensagem) {
            return res.status(400).send('Usuário e mensagem são obrigatórios!');
        }

        // Aqui você pode adicionar lógica para salvar mensagens em um banco de dados ou lista
        const newMessage = { usuario, mensagem, timestamp: new Date() };

        // Envia uma resposta de sucesso
        res.status(200).send(`Mensagem enviada por ${usuario}: ${mensagem}`);
    }
};

module.exports = chatController;
