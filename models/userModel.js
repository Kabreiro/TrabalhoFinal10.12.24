const users = []; // Armazena usuários na memória

module.exports = {
    addUser: (nome, nascimento, nickname) => {
        users.push({ nome, nascimento, nickname });
    },
    getUsers: () => users,
    isNicknameUnique: (nickname) => {
        return !users.some(user => user.nickname === nickname);
    },
};
