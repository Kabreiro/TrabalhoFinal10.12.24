const mysql = require('mysql2');

// Criando a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',        // O host do banco de dados
  user: 'root',             // Seu usuário do MySQL
  password: '',             // A senha do seu usuário MySQL
  database: 'chat_app'      // O nome do banco de dados
});

// Verificando a conexão
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);  // Se não conseguir conectar, o servidor vai encerrar
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Exportando a conexão para ser utilizada em outros arquivos
module.exports = db;
