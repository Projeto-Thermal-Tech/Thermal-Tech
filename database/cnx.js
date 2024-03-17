// Importe o pacote dotenv no início do seu arquivo
require('dotenv').config();

// Use as variáveis de ambiente definidas no arquivo .env
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'banco_tt' // ou qualquer outro valor padrão
};

// Utilize as variáveis de configuração do banco de dados conforme necessário
const { Pool } = require('pg');
const pool = new Pool(dbConfig);

module.exports = pool;