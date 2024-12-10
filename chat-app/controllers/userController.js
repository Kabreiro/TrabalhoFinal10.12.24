module.exports.getCadastro = (req, res) => {
    // Verifica se o usuário já está autenticado. Se estiver, redireciona para o chat.
    if (req.session.user) {
        return res.redirect('/chat.html');
    }

    // Aqui, adicionei uma lista fictícia de usuários para exibir como exemplo
    const users = [
        { nome: 'João', nickname: 'joao123' },
        { nome: 'Maria', nickname: 'maria_22' }
    ];

    // Passando os usuários para a view
    res.render('cadastroUsuario', { users });
};


module.exports.postCadastro = (req, res) => {
    // Validação dos dados de entrada
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    // Aqui, você pode adicionar lógica para salvar o usuário no banco de dados.
    // Exemplo fictício de cadastro na sessão (não recomendado para produção, use banco de dados).
    req.session.user = {
        name,
        email,
        // Não é recomendado salvar senhas em texto claro. Aqui é apenas um exemplo.
        password, 
    };

    // Redireciona para o chat após cadastro bem-sucedido
    res.redirect('/chat.html');
};
