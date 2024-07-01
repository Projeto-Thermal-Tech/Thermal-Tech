const pg = require("pg")
const {Pool} = require('pg')

const NewPool = new Pool({
    user:"postgres",
    host:"34.95.252.117",
    database:"banco_tt",
    password:"123456",
    port:"5432"
})

module.exports = NewPool