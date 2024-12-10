const chatController = {
    // Rota para exibir o chat com usuários e mensagens
    getChat: (req, res) => {
        // Usuários simulados - substitua por dados reais
        const usuarios = [
            { nickname: 'Joao' },
            { nickname: 'Julio' },
            { nickname: 'Carol' },
            { nickname: '' } // Exemplo de novo usuário
        ];

        // Mensagens simuladas - substitua por dados reais
        const mensagens = [
            { usuario: 'Joao', texto: 'Oi, pessoal!', timestamp: '2024-12-10 10:00' },
            { usuario: 'Julio', texto: 'Olá, tudo bem?', timestamp: '2024-12-10 10:02' },
            { usuario: 'Carol', texto: 'Oi, Julio!', timestamp: '2024-12-10 10:03' }
        ];

        // Armazenando os usuários e mensagens no `locals` para que fiquem disponíveis entre as requisições
        req.app.locals.usuarios = usuarios;
        req.app.locals.mensagens = mensagens;

        // Renderiza a página 'chat' com os dados de usuários e mensagens
        res.render('chat', { usuarios, mensagens });
    },

    // Rota para processar o envio de uma nova mensagem
    postMensagem: (req, res) => {
        const { usuario, mensagem } = req.body;

        // Verifica se ambos os campos estão presentes
        if (!usuario || !mensagem) {
            return res.status(400).send('Usuário e mensagem são obrigatórios!');
        }

        // Criação de uma nova mensagem com timestamp (data/hora atual)
        const newMessage = {
            usuario,
            texto: mensagem,
            timestamp: new Date().toLocaleString() // Marca de tempo no formato local
        };

        // Adiciona a nova mensagem à lista existente de mensagens
        req.app.locals.mensagens.push(newMessage);

        // Renderiza novamente a página do chat com a nova mensagem
        res.render('chat', {
            usuarios: req.app.locals.usuarios,
            mensagens: req.app.locals.mensagens
        });
    }
};

module.exports = chatController;
