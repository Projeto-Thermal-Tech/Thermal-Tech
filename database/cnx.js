const pg = require("pg")

const client = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"TT",
    password:"216572",
    port:"5432"
})

module.exports = client