const db = require("./cnx")

async function insert(){
    await db.connect()
    resultado = await db.query("select * from alunos")
    novoAluno = await db.query("insert into alunos(al_nome) VALUES ('jean')")
    mostrarAluno= await db.query("select * from alunos")
    console.log(resultado.rows)
    console.log(mostrarAluno.rows)
    await db.end()

}
insert()