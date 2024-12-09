const messages = []; // Armazena mensagens na memória

module.exports = {
    addMessage: (usuario, mensagem) => {
        const timestamp = new Date();
        messages.push({ usuario, mensagem, timestamp });
    },
    getMessages: () => messages,
};
