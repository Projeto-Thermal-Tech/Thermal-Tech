const db = require("./cnx")

exports.insert =function(tag,tipo,modelo,ns,area,local,setor,descricao){
    async function insert(tag,tipo,modelo,ns,area,local,setor,descricao){
        await db.connect()
        tabela = await db.query("select * from equipamentos")
        console.log(tabela.rows)
        const inserir =("insert into equipamentos(tag_listquip, tipo_listequip, modelo_listquip, numero_serie_listquip, area_cli_listquip, localidade_listquip, setor_listequip, descricao_equip,) values ($1,$2,$3,$4,$5,$6,$7,$8)")
        await db.query(inserir,[tag,tipo,modelo,ns,area,local,setor,descricao])
        console.log(tabela.rows)
    }
    return insert(tag,tipo,modelo,ns,area,local,setor,descricao)
}