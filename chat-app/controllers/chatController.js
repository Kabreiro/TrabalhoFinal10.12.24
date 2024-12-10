// chatController.js
const mensagens = []; // Armazenando mensagens na memória (poderia ser um banco de dados)
const usuarios = []; // A mesma "base de dados" dos usuários

exports.getChat = (req, res) => {
    res.render('chat', { mensagens, usuarios });
};

exports.postMensagem = (req, res) => {
    const { usuario, mensagem } = req.body;

    // Valida se os campos estão preenchidos
    if (!usuario || !mensagem) {
        return res.render('chat', { mensagens, usuarios, error: 'Preencha todos os campos' });
    }

    // Adiciona a mensagem à lista
    mensagens.push({
        usuario,
        texto: mensagem,
        data: new Date().toLocaleString(),
    });

    // Renderiza novamente o bate-papo com a mensagem nova
    res.render('chat', { mensagens, usuarios });
};
