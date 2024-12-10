const messages = []; // Armazena mensagens na memória
const MAX_MESSAGES = 1000; // Limite máximo de mensagens armazenadas

module.exports = {
    // Adiciona uma nova mensagem
    addMessage: (usuario, mensagem) => {
        if (typeof usuario !== 'string' || typeof mensagem !== 'string') {
            throw new Error('O nome do usuário e a mensagem devem ser do tipo string.');
        }

        const timestamp = new Date().toISOString(); // Formato ISO para o timestamp

        // Adiciona a nova mensagem
        messages.push({ usuario, mensagem, timestamp });

        // Se o número de mensagens exceder o limite, remove a mais antiga
        if (messages.length > MAX_MESSAGES) {
            messages.shift(); // Remove a primeira mensagem (mais antiga)
        }
    },

    // Retorna todas as mensagens armazenadas
    getMessages: () => {
        return messages;
    },

    // Limpa todas as mensagens (opcional)
    clearMessages: () => {
        messages.length = 0; // Limpa o array
    },
};
