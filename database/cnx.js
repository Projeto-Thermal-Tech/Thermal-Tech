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

const { text } = require('express');
// Utilize as variáveis de configuração do banco de dados conforme necessário
const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

pool.connect((err, pool, done) => {
  if (err) {
      console.log("Error in connecting database: ", err);
  } else {
      console.log("Database connected");
      pool.on('notification', (msg) => {
          console.log(msg.payload);
      });
      const query = pool.query("LISTEN insert_notification");
  }
});


module.exports = pool;

