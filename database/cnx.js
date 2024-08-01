const { Pool } = require('pg');
const express = require("express");
const eventManager = require('./eventManager');
const redis = require('redis');

// Configuração do Redis
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

// Configuração do banco de dados
const dbConfig = {
    user: 'postgres',
    password: '123456',
    host:'34.95.252.117',
    port:'5432',
    database:'banco_tt',
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis: 35000,
    connectionTimeoutMillis: 35000,
    max: 50,
    maxUses: 7500
};

const pool = new Pool(dbConfig);

pool.on('connect', () => {
    console.log('Database connected');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

pool.connect((err, client, done) => {
    if (err) {
        console.log("Error in connecting database: ", err);
    } else {
        client.on('notification', (msg) => {
            console.log(msg.payload);
            eventManager.emit('newNotification', msg.payload);
        });
        client.query("LISTEN update_notification");
    }
});

// Função para obter dados com cache
async function getDataWithCache(key, query) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, result) => {
            if (err) {
                reject(err);
            } else if (result) {
                resolve(JSON.parse(result));
            } else {
                pool.query(query, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        redisClient.setex(key, 3600, JSON.stringify(res.rows)); // Cache por 1 hora
                        resolve(res.rows);
                    }
                });
            }
        });
    });
}

module.exports = pool ;