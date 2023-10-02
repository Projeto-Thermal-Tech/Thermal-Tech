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

exports.insertEquip = function (tag, tipo, modelo, ns, area, local, setor, descricao) {
    async function novoEquip(tag, tipo, modelo, ns, area, local, setor, descricao) {
        await db.connect()
        tabela = await db.query("select * from lista_equipamentos")
        console.log(tabela.rows)
        const inserir = ("insert into lista_equipamentos(tag_listequip, tipo_listequip, modelo_listequip, numero_serie_listequip, area_cli_listequip, localidade_listequip, setor_listequip, descricao_listequip) values ($1,$2,$3,$4,$5,$6,$7,$8)")
        await db.query(inserir, [tag, tipo, modelo, ns, area, local, setor, descricao])
        console.log(tabela.rows)
    }
    return novoEquip(tag, tipo, modelo, ns, area, local, setor, descricao)
}
exports.insertSetor = function (nome_setor) {
    async function novoSetor(nome_setor) {
        await db.connect()
        const inserir = ("insert into setor(nome_setor) values ($1)")
        await db.query(inserir, [nome_setor])
    }
    return novoSetor(nome_setor)
}
exports.insertTecnico = function (nome,matricula,email) {
    async function novoTec(nome,matricula,email) {
        await db.connect()
        const inserir = ("insert into tecnicos(nome_tec,matricula_tec,email) values ($1,$2,$3)")
        await db.query(inserir, [nome,matricula,email])
    }
    return novoTec(nome,matricula,email)
}
exports.insertTipo = function (nome) {
    async function novoTipo(nome) {
        await db.connect()
        const inserir = ("insert into tipos_arcondicionado(tipos_arcondicionado_tipar) values ($1)")
        await db.query(inserir, [nome])
    }
    return novoTipo(nome)
}
exports.insertChamado =  function(status, equipamento, descricao, prioridade, criado, datainicio, horainicio, descricaocha){
    async function novoChamado(status, equipamento, descricao, prioridade, criado, datainicio, horainicio, descricaocha){
        await db.connect()
        tabela = await db.query("SELECT * FROM chamado")
        const inserir = ("insert into chamado( status_cha,equipamento_cha,descri_cha,prioridade_cha,criado_por_cha,data_ini_cha,hora_ini_cha, descricao_cha) values($1,$2,$3,$4,$5,$6,$7,$8)")
        await db.query(inserir,[status, equipamento, descricao, prioridade, criado, datainicio, horainicio, descricaocha])
    }
    return novoChamado(status, equipamento, descricao, prioridade, criado, datainicio, horainicio, descricaocha)
}
exports.insertUser = function (nome,email) {
    async function novoUser(nome,email) {
        await db.connect()
        const inserir = ("insert into usuarios(nome, email) values ($1,$2)")
        await db.query(inserir, [nome,email])
    }
    return novoUser(nome,email)
}
 
// exports.dados = function(){ 
// async function listarDados() {
//     const sql = "select * from setor";
//     tabela = await db.query(sql);
//     return tabela.rows;
// }
// listarDados() 
// }
