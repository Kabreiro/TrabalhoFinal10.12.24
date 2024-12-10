// chatController.js

const chatController = {
    getChat: (req, res) => {
        res.render('chat'); // Renderiza a página de chat
    },

    postMensagem: (req, res) => {
        const { message } = req.body;
        // Aqui você pode adicionar lógica para armazenar a mensagem
        res.status(200).send(`Mensagem recebida: ${message}`);
    }
};

module.exports = chatController;
