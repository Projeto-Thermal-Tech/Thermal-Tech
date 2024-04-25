const pg = require("pg")
const {Pool} = require('pg')

const NewPool = new Pool({
    user:"postgres",
    host:"34.151.204.122",
    database:"banco_tt",
    password:"123456",
    port:"5432"
})

module.exports = NewPool