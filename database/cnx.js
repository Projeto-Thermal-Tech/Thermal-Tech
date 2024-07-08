// Importe o pacote dotenv no início do seu arquivo
require('dotenv').config();
const express = require("express")
const eventManager = require('./eventManager');
// Use as variáveis de ambiente definidas no arquivo .env
const dbConfig = {
    user: 'postgres',
    password: '123456',
    host: '34.95.252.117',
    port: '5432',
    database: 'banco_tt' // ou qualquer outro valor padrão
};


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
        eventManager.emit('newNotification', msg.payload); // Disparar o evento quando uma nova notificação é recebida
    });    
      const query = pool.query("LISTEN update_notification");
  }
});


module.exports = pool


  


