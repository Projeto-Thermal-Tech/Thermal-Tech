const pg = require("pg")
const {Pool} = require('pg')

const NewPool = new Pool({
    user:"postgres",
    host:"35.199.103.167",
    database:"postgres",
    password:"123456",
    port:"5432"
})

module.exports = NewPool