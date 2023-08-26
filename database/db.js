// const db = require('./cnx');

// async function insert() {
   
//         await db.connect();
        
//         const selectQuery = 'SELECT * FROM tecnicos';
//         const selectResult = await db.query(selectQuery);
//         console.log('Antes da atualização:', selectResult.rows);

//         const updateQuery = "UPDATE tecnicos set nome_tec = 'Lucas Franco' WHERE id_tec = 5 ";
//         await db.query(updateQuery);
        
//         const selectResultAfterupdate = await db.query(selectQuery);
//         console.log('Após a exclusão:', selectResultAfterupdate.rows);
//     } 

// insert();


const db = require("./cnx")

exports.insert =function(tag,tipo,modelo,ns,area,local,setor,descricao){
    async function novoEquip(tag,tipo,modelo,ns,area,local,setor,descricao){
        await db.connect()
        tabela = await db.query("select * from lista_equipamentos")
        console.log(tabela.rows)
        const inserir =("insert into lista_equipamentos(tag_listequip, tipo_listequip, modelo_listequip, numero_serie_listequip, area_cli_listequip, localidade_listequip, setor_listequip, descricao_listequip) values ($1,$2,$3,$4,$5,$6,$7,$8)")
        await db.query(inserir,[tag,tipo,modelo,ns,area,local,setor,descricao])
        console.log(tabela.rows)
    }
    return novoEquip(tag,tipo,modelo,ns,area,local,setor,descricao)
}