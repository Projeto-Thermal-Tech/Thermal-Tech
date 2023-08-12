const db = require("./cnx")

async function insert(){
    await db.connect()
    tabela = await db.query("select * from tecnicos")
    novoTec = await db.query("insert into tecnicos(nome_tec, matricula) values ('Victor', '12145')")
    novaTabela = await db.query("select * from tecnicos")
    console.log(tabela.rows)
    console.log(novaTabela.rows)
    await db.end()

}
insert()