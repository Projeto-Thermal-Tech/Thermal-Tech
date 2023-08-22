const pg = require("pg")
const {Pool} = require('pg')

const pool = new Pool({
    user:"postgres",
    host:"34.95.240.9",
    database:"postgres",
    password:"123456",
    port:"5432"
})

module.exports = Pool