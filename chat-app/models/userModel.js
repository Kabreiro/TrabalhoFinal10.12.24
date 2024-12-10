const users = []; // Armazena usuários na memória
const MAX_USERS = 1000; // Limite máximo de usuários armazenados

module.exports = {
    // Adiciona um novo usuário
    addUser: (nome, nascimento, nickname) => {
        // Validações
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error('O nome do usuário deve ser uma string não vazia.');
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(nascimento)) { // Verifica se a data de nascimento está no formato YYYY-MM-DD
            throw new Error('A data de nascimento deve estar no formato YYYY-MM-DD.');
        }

        const nascimentoDate = new Date(nascimento);
        if (isNaN(nascimentoDate)) {
            throw new Error('Data de nascimento inválida.');
        }

        if (typeof nickname !== 'string' || nickname.trim() === '') {
            throw new Error('O nickname deve ser uma string não vazia.');
        }

        // Verifica se o nickname é único
        if (!module.exports.isNicknameUnique(nickname)) {
            throw new Error('O nickname já está em uso.');
        }

        // Adiciona o usuário
        users.push({ nome, nascimento: nascimentoDate.toISOString(), nickname });

        // Se o número de usuários exceder o limite, remove o mais antigo
        if (users.length > MAX_USERS) {
            users.shift(); // Remove o primeiro usuário (mais antigo)
        }
    },

    // Retorna todos os usuários armazenados
    getUsers: () => {
        return users;
    },

    // Verifica se o nickname é único
    isNicknameUnique: (nickname) => {
        return !users.some(user => user.nickname === nickname);
    },
};

