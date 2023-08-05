const pg = require("pg")

const client = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"ens4",
    password:"216572",
    port:"5432"
})

module.exports = client