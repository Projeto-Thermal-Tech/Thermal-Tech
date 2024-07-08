
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
exports.insertTecnico = function (matricula,nome,email) {
    async function novoTec(matricula,nome,email) {
        await db.connect()
        const inserir = ("insert into tecnicos(matricula_tec,nome_tec,email) values ($1,$2,$3)")
        await db.query(inserir, [matricula,nome,email])
    }
    return novoTec(matricula,nome,email)
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
exports.insertOrdem = function(num_ord,titulo_ord, status, num_chamado, criador, data_init, hora_init, prioridade, tipo_manut) {
    async function novaOrdem(num_ord,titulo_ord, status, num_chamado, criador, data_init, hora_init, prioridade, tipo_manut) {
        await db.connect();
        tabela = await db.query("SELECT * FROM ordem");
        const inserir = ("insert into ordem(id_ordem,titulo_ord,status_ord,numero_cha,criado_por_ord,data_ini_ord,hora_ini_ord,prioridade_ord,manut_ord) values($1,$2,$3,$4,$5,$6,$7,$8,$9)");
        await db.query(inserir,[num_ord,titulo_ord,status,num_chamado,criador,data_init,hora_init,prioridade,tipo_manut]);
    }
    return novaOrdem(num_ord,titulo_ord,status,num_chamado,criador,data_init,hora_init,prioridade,tipo_manut);
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
exports.insertFeedback = function (anonymous_feed, nome_feed, email_feed, descricao_feed) {
    async function novoFeedback(anonymous_feed, nome_feed, email_feed, descricao_feed) {
        await db.connect();
        const inserir = 'INSERT INTO feedbacks (anonymous_feed, nome_feed, email_feed, descricao_feed) VALUES ($1, $2, $3, $4)';
        await db.query(inserir, [anonymous_feed, nome_feed, email_feed, descricao_feed]);
    }
    return novoFeedback(anonymous_feed, nome_feed, email_feed, descricao_feed);
}
exports.insertSuporte = function (nome_desc, email_desc, descricao_desc, arquivos) {
    async function novoSuporte(nome_desc, email_desc, descricao_desc, arquivos) {
        await db.connect();
        const inserirSuporte = 'INSERT INTO Suporte (nome_desc, email_desc, descricao_desc) VALUES ($1, $2, $3) RETURNING id';
        const resSuporte = await db.query(inserirSuporte, [nome_desc, email_desc, descricao_desc]);
        const suporteId = resSuporte.rows[0].id;
        const inserirArquivo = 'INSERT INTO SuporteArquivos (suporte_id, arquivo_nome, arquivo_caminho) VALUES ($1, $2, $3)';
        for (const arquivo of arquivos) {
            await db.query(inserirArquivo, [suporteId, arquivo.originalname, arquivo.path]);
        }
    }
    return novoSuporte(nome_desc, email_desc, descricao_desc, arquivos);
}

// exports.insertPerfil_Usuario = function (nome_pfu, email_pfu, telefone_pfu, cpf_pfu, data_nascimento_pfu) {
//     async function novoPerfil_Usuario(nome_pfu, email_pfu, telefone_pfu, cpf_pfu, data_nascimento_pfu) {
//         console.log(nome_pfu, email_pfu, telefone_pfu, cpf_pfu, data_nascimento_pfu);
//         await db.connect();
//         const inserir = 'INSERT INTO Perfil_Usuario (nome_pfu, email_pfu, telefone_pfu, cpf_pfu, data_nascimento_pfu) VALUES ($1, $2, $3, $4, $5)';
//         await db.query(inserir, [nome_pfu, email_pfu, telefone_pfu, cpf_pfu, data_nascimento_pfu]);
//     }
//     return novoPerfil_Usuario(nome_pfu, email_pfu, telefone_pfu, cpf_pfu, data_nascimento_pfu);
// }

exports.updateEquip = function (id, tag, tipo, modelo, ns, area, local, setor, descricao, pdfInfo) {
    async function atualizarEquip(id, tag, tipo, modelo, ns, area, local, setor, descricao, pdfInfo) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM lista_equipamentos WHERE id_equip = $1', [id]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Prepara a consulta SQL base
            let atualizacao = `
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
            `;
            let valores = [id, tag, tipo, modelo, ns, area, local, setor, descricao];

            // Se pdfInfo for fornecido, adicione à consulta
            if (pdfInfo) {
                atualizacao += `, anexo_nome_listequip = $10, anexo_caminho_listequip = $11`;
                valores.push(pdfInfo.nome, pdfInfo.caminho);
            }

            // Finaliza a consulta com a cláusula WHERE
            atualizacao += ` WHERE id_equip = $1`;

            // Executa a consulta
            await db.query(atualizacao, valores);

            return 'Registro e PDF atualizados com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao atualizar registro e inserir PDF: ${error.message}`);
        }
    }

    return atualizarEquip(id, tag, tipo, modelo, ns, area, local, setor, descricao, pdfInfo);
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
 
exports.updateTecnicos = function ( matricula_tec, nome_tec, email) {
    async function atualizarTecnicos( matricula_tec, nome_tec, email) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM tecnicos WHERE  matricula_tec = $1', [ matricula_tec,]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a atualização dos dados
            const atualizacao = `
                UPDATE tecnicos
                SET
                    nome_tec = $2,
                    email = $3
                WHERE  matricula_tec = $1
            `;
            await db.query(atualizacao, [ matricula_tec, nome_tec,  email]);

            return 'Registro atualizado com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao atualizar registro: ${error.message}`);
        } 
    }

    return atualizarTecnicos( matricula_tec, nome_tec,  email);
}
exports.deleteTecnico = function (matricula_tec) {
    async function deletarTecnico(matricula_tec) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM tecnicos WHERE matricula_tec = $1', [matricula_tec]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }

            // Execute a exclusão dos dados
            const exclusao = `
                DELETE FROM tecnicos
                WHERE matricula_tec = $1
            `;
            await db.query(exclusao, [matricula_tec]);

            return 'Registro excluído com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao excluir registro: ${error.message}`);
        } 
    }

    return deletarTecnico(matricula_tec);
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
exports.updateOrdem = function (id,data_fim,hora_fim,matricula,data_lanc_ord,hora_ini_trab,data_ini_trab,data_fim_trab,hora_fim_trab, texto_servico) {
    async function atualizarOrdem(id,data_fim,hora_fim,matricula,data_lanc_ord,hora_ini_trab,data_ini_trab,data_fim_trab,hora_fim_trab, texto_servico) {
        try {
            await db.connect();

            // Verifique se o registro com o ID fornecido existe na tabela
            const verificaRegistro = await db.query('SELECT * FROM ordem WHERE id_ordem = $1', [id]);
            if (verificaRegistro.rows.length === 0) {
                throw new Error('Registro não encontrado.');
            }
            const atualizacao = `
                UPDATE ordem
                SET
                    data_fim_ord  = $2,
                    hora_fim_ord = $3,
                    matricula_ord = $4,
                    data_lanc_ord = $5,
                    hora_ini_trab  = $6,
                    data_ini_trab = $7,
                    data_fim_trab = $8,
                    hora_fim_trab = $9,
                    texto_servico =$10
                WHERE id_ordem = $1
            `;
            await db.query(atualizacao, [id,data_fim,hora_fim,matricula,data_lanc_ord,hora_ini_trab,data_ini_trab,data_fim_trab,hora_fim_trab, texto_servico]);

            return 'Registro atualizado com sucesso.';
        } catch (error) {
            throw new Error(`Erro ao atualizar registro: ${error.message}`);
        } 
    }

    return atualizarOrdem(id,data_fim,hora_fim,matricula,data_lanc_ord,hora_ini_trab,data_ini_trab,data_fim_trab,hora_fim_trab, texto_servico);
}