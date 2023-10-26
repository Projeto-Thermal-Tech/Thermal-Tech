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
exports.insertChamado =  function(status, equipamento, descricao, prioridade, criado, email,  datainicio, horainicio, descricaocha){
    async function novoChamado(status, equipamento, descricao, prioridade, criado, email, datainicio, horainicio, descricaocha){
        await db.connect()
        tabela = await db.query("SELECT * FROM chamado")
        const inserir = ("insert into chamado( status_cha,equipamento_cha,descri_cha,prioridade_cha,criado_por_cha,email,data_ini_cha,hora_ini_cha, descricao_cha) values($1,$2,$3,$4,$5,$6,$7,$8,$9)")
        await db.query(inserir,[status, equipamento, descricao, prioridade, criado, email, datainicio, horainicio, descricaocha])
    }
    return novoChamado(status, equipamento, descricao, prioridade, criado, email, datainicio, horainicio, descricaocha)
}












// exports.insertOrdem = function(status,criador,data_inicio,hora_inicio,prioridade,data_fim,hora_fim,tipo_manut,matricula,data_lancamento,data_inicio_trabalho,hora_inicio_trabalho,data_fim_trabalho,hora_fim_trabalho,desc_manut ){
//     async function novaOrdem(status,criador,data_inicio,hora_inicio,prioridade,data_fim,hora_fim,tipo_manut,matricula,data_lancamento,data_inicio_trabalho,hora_inicio_trabalho,data_fim_trabalho,hora_fim_trabalho,desc_manut){
//         await db.connect()
//         tabela = await db.query("SELECT * FROM ordem")
//         const inserir = ("insert into ordem(status_ord,criado_por_ord, data_ini_ord, hora_ini_ord, prioridade_ord, data_fim_ord, hora_fim_ord, manut_ord, matricula_ord,data_lanc_ord,data_ini_trab, hora_ini_trab,data_fim_trab, hora_fim_trab, texto_servico) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)")
//         await db.query(inserir,[status,criador,data_inicio,hora_inicio,prioridade,data_fim,hora_fim,tipo_manut,matricula,data_lancamento,data_inicio_trabalho,hora_inicio_trabalho,data_fim_trabalho,hora_fim_trabalho,desc_manut])
//     }
//     return novaOrdem(status,criador,data_inicio,hora_inicio,prioridade,data_fim,hora_fim,tipo_manut,matricula,data_lancamento,data_inicio_trabalho,hora_inicio_trabalho,data_fim_trabalho,hora_fim_trabalho,desc_manut)
// }
exports.insertOrdem = function(num_ord, status, num_chamado, criador, data_init, hora_init, prioridade, tipo_manut) {
    async function novaOrdem(num_ord, status, num_chamado, criador, data_init, hora_init, prioridade, tipo_manut) {
        await db.connect();
        tabela = await db.query("SELECT * FROM ordem");
        const inserir = ("insert into ordem(id_ordem,status_ord,numero_cha,criado_por_ord,data_ini_ord,hora_ini_ord,prioridade_ord,manut_ord) values($1,$2,$3,$4,$5,$6,$7,$8)");
        await db.query(inserir,[num_ord,status,num_chamado,criador,data_init,hora_init,prioridade,tipo_manut]);
    }
    return novaOrdem(num_ord,status,num_chamado,criador,data_init,hora_init,prioridade,tipo_manut);
} 
exports.proximoNumeroOrdem = async function() {
    const result = await db.query('SELECT MAX(id_ordem) FROM ordem');
    const ultimaOrdem = result.rows[0].max || 0;

    // Incremente o número da ordem
    const proximaOrdem = ultimaOrdem + 1;

    return proximaOrdem;
}












exports.insertUser = function (nome,email) {
    async function novoUser(nome,email) {
        await db.connect()
        const inserir = ("insert into usuarios(nome, email) values ($1,$2)")
        await db.query(inserir, [nome,email])
    }
    return novoUser(nome,email)
}
exports.selectChamado = async function() {
    try {
      await db.connect();
      const query = 'SELECT chamado.id_chamado, prioridade.nome_pri AS prioridade_cha, chamado.descri_cha, chamado.status_cha, chamado.criado_por_cha, chamado.data_ini_cha FROM chamado INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade';
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao executar a consulta SELECT:', error);
      throw error;
    } finally {
      await db.end();
    }
};

exports.updateEquip = function (id, tag, tipo, modelo, ns, area, local, setor, descricao) {
    async function atualizarEquip(id, tag, tipo, modelo, ns, area, local, setor, descricao) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM lista_equipamentos WHERE id_equip = $1', [id]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a atualização dos dados
            const atualizacao = `
                UPDATE lista_equipamentos
                SET
                    tag_listequip = $2,
                    tipo_listequip = $3,
                    modelo_listequip = $4,
                    numero_serie_listequip = $5,
                    area_cli_listequip = $6,
                    localidade_listequip = $7,
                    setor_listequip = $8,
                    descricao_listequip = $9
                WHERE id_equip = $1
            `;
            await db.query(atualizacao, [id, tag, tipo, modelo, ns, area, local, setor, descricao]);

            return 'Registro atualizado com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao atualizar registro: ${error.message}`);
        } 
    }

    return atualizarEquip(id, tag, tipo, modelo, ns, area, local, setor, descricao);
}

exports.deleteEquip = function (id) {
    async function excluirEquip(id) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM lista_equipamentos WHERE id_equip = $1', [id]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a exclusão do registro
            const exclusao = 'DELETE FROM lista_equipamentos WHERE id_equip = $1';
            await db.query(exclusao, [id]);

            return 'Registro excluído com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao excluir registro: ${error.message}`);
        } 
    }

    return excluirEquip(id);
}
 
exports.updateTecnicos = function (id_tec, nome_tec, matricula_tec, email) {
    async function atualizarTecnicos(id_tec, nome_tec, matricula_tec, email) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM tecnicos WHERE id_tec = $1', [id_tec]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a atualização dos dados
            const atualizacao = `
                UPDATE tecnicos
                SET
                    nome_tec = $2,
                    matricula_tec = $3,
                    email = $4
                WHERE id_tec = $1
            `;
            await db.query(atualizacao, [id_tec, nome_tec, matricula_tec, email]);

            return 'Registro atualizado com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao atualizar registro: ${error.message}`);
        } 
    }

    return atualizarTecnicos(id_tec, nome_tec, matricula_tec, email);
}
exports.deleteTecnico = function (id_tec) {
    async function deletarTecnico(id_tec) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM tecnicos WHERE id_tec = $1', [id_tec]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a exclusão dos dados
            const exclusao = `
                DELETE FROM tecnicos
                WHERE id_tec = $1
            `;
            await db.query(exclusao, [id_tec]);

            return 'Registro excluído com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao excluir registro: ${error.message}`);
        } 
    }

    return deletarTecnico(id_tec);
}
exports.updateSetor = function (id_setor, nome_setor) {
    async function atualizarSetor(id_setor, nome_setor) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM setor WHERE id_setor = $1', [id_setor]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a atualização dos dados
            const atualizacao = `
                UPDATE setor
                SET nome_setor = $2
                WHERE id_setor = $1
            `;
            await db.query(atualizacao, [id_setor, nome_setor]);

            return 'Registro atualizado com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao atualizar registro: ${error.message}`);
        } 
    }

    return atualizarSetor(id_setor, nome_setor);
}
exports.deleteSetor = function (id_setor) {
    async function deletarSetor(id_setor) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM setor WHERE id_setor = $1', [id_setor]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a exclusão dos dados
            const exclusao = `
                DELETE FROM setor
                WHERE id_setor = $1
            `;
            await db.query(exclusao, [id_setor]);

            return 'Registro excluído com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao excluir registro: ${error.message}`);
        }
    }

    return deletarSetor(id_setor);
}

exports.updateTipo = function (id_tipar, tipos_arcondicionado_tipar) {
    async function atualizarTipo(id_tipar, tipos_arcondicionado_tipar) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM tipos_arcondicionado WHERE id_tipar = $1', [id_tipar]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a atualização dos dados
            const atualizacao = `
                UPDATE tipos_arcondicionado
                SET tipos_arcondicionado_tipar = $2
                WHERE id_tipar = $1
            `;
            await db.query(atualizacao, [id_tipar, tipos_arcondicionado_tipar]);

            return 'Registro atualizado com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao atualizar registro: ${error.message}`);
        } 
    }

    return atualizarTipo(id_tipar, tipos_arcondicionado_tipar);
}
exports.deleteTipoArCondicionado = function (id_tipar) {
    async function deletarTipoArCondicionado(id_tipar) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM tipos_arcondicionado WHERE id_tipar = $1', [id_tipar]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a exclusão dos dados
            const exclusao = `
                DELETE FROM tipos_arcondicionado
                WHERE id_tipar = $1
            `;
            await db.query(exclusao, [id_tipar]);

            return 'Registro excluído com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao excluir registro: ${error.message}`);
        }
    }

    return deletarTipoArCondicionado(id_tipar);
}


// exports.dados = function(){ 
// async function listarDados() {
//     const sql = "select * from setor";
//     tabela = await db.query(sql);
//     return tabela.rows;
// }
// listarDados() 
// }
