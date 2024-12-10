const chatController = {
    // Rota para exibir o chat com usuários e mensagens
    getChat: (req, res) => {
        // Usuários simulados - substitua por dados reais (de um banco de dados, por exemplo)
        const usuarios = [
            { nickname: 'Joao' },
            { nickname: 'Julio' },
            { nickname: 'Carol' },
            { nickname: 'Joninhas' } // Exemplo de novo usuário
        ];

        // Mensagens simuladas - substitua por dados reais de um banco ou similar
        const mensagens = [
            { usuario: 'Joao', texto: 'Oi, pessoal!', timestamp: '2024-12-10 10:00' },
            { usuario: 'Julio', texto: 'Olá, tudo bem?', timestamp: '2024-12-10 10:02' },
            { usuario: 'Carol', texto: 'Oi, Julio!', timestamp: '2024-12-10 10:03' }
        ];

        // Renderiza a página 'chat' com os dados de usuários e mensagens
        res.render('chat', { usuarios, mensagens });
    },

    // Rota para processar o envio de uma nova mensagem
    postMensagem: (req, res) => {
        // Coleta os dados do formulário
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

        // Aqui você pode adicionar a lógica para salvar a mensagem no banco de dados

        // Envia a nova mensagem para o frontend (usado para atualizar a interface do chat)
        res.json({ usuario: newMessage.usuario, texto: newMessage.texto, timestamp: newMessage.timestamp });
    }
};

module.exports = chatController;
