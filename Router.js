const express = require("express")
const router = express.Router()
const path = require("path")
const novoEquip = require('../Thermal-Tech/database/db');
const novoSetor = require('../Thermal-Tech/database/db');
const novoTec = require('../Thermal-Tech/database/db');
const novoTipo = require('../Thermal-Tech/database/db');
const novoUser = require('../Thermal-Tech/database/db');
const novoChamado = require('../Thermal-Tech/database/db');
const dados = require('../Thermal-Tech/database/db');
const { error } = require("console");
const db = require("./database/cnx");
const { email } = require('../Thermal-Tech/public/js/config');


router.use(express.static(path.join(__dirname, "/public")));


router.get("/cadastro", async function (req, res) {
    try {
        let tabelaSetor;
        let tabelaTec;
        let tabelaEquip;  // Declare a variável fora da função

        async function listarDados() {
            const sqlSetor = "select * from setor";
            const sqlTec = "select * from tecnicos";
            const sqlEquip = "select * from tipos_arcondicionado";
            tabelaSetor = await db.query(sqlSetor);
            tabelaTec = await db.query(sqlTec);
            tabelaEquip = await db.query(sqlEquip); // Atribua o valor dentro da função
            console.log(tabelaTec.rows)
        }

        await listarDados(); // Espere até que a função listarDados seja concluída

        res.render('cadastro', { setores: tabelaSetor.rows, tipo: tabelaEquip.rows, tecnicos: tabelaTec.rows }); // Agora a variável tabela está acessível aqui
    } catch (error) {
        res.status(500).send("Erro ao buscar os dados da tabela setor: " + error.message);
    }
});
router.get("/chamado", async function (req, res) {
    try {
        async function listarchamados() {
            const sql = "SELECT chamado.*, status.nome_status FROM chamado INNER JOIN status ON chamado.status_cha = status.id_status";
            chamados = await db.query(sql)
        }
        await listarchamados(); // Espere até que a função listarDados seja concluída
        

        res.render('chamado', {chamados:chamados.rows }); // Agora a variável tabela está acessível aqui
    } catch (error) {
        res.status(500).send("Erro ao buscar os dados: " + error.message);
    }
});

router.get("/equipamentos", async function (req, res) {
    try {
        let equipamentos;

        async function listarEquipamentos() {
            const sql = "SELECT lista_equipamentos.*, tipos_arcondicionado.tipos_arcondicionado_tipar, setor.nome_setor FROM lista_equipamentos INNER JOIN tipos_arcondicionado ON lista_equipamentos.tipo_listequip = tipos_arcondicionado.id_tipar INNER JOIN setor ON lista_equipamentos.setor_listequip = setor.id_setor;";
            const sqlSetor = "select * from setor";
            const sqlEquip = "select * from tipos_arcondicionado";
            tabelaTipo = await db.query(sqlEquip);
            tabelaSetor = await db.query(sqlSetor);
            tabelaEquip = await db.query(sql); // Atribua o valor dentro da função
        }
        await listarEquipamentos(); // Espere até que a função listarDados seja concluída

        res.render('listaEquip', { equipamentos: tabelaEquip.rows, setores: tabelaSetor.rows, tipo: tabelaTipo.rows }); // Agora a variável tabela está acessível aqui
    } catch (error) {
        res.status(500).send("Erro ao buscar os dados: " + error.message);
    }
});

router.get("/novo-chamado", async function (req, res) {
    try {
        let equipamentos;

        async function listarchamados() {
            const sql = "SELECT lista_equipamentos.*, setor.nome_setor FROM lista_equipamentos INNER JOIN setor ON lista_equipamentos.setor_listequip = setor.id_setor;";
            const sqlSetor = "select * from setor";
            const sqlEquip = "select * from tipos_arcondicionado";
            const sqlUsuarios = "SELECT * FROM usuarios";
            const result = await db.query('SELECT MAX(id_chamado) FROM chamado');
            const ultimoChamado = result.rows[0].max || 0;

            // Incremente o número do chamado
            const proximoChamado = ultimoChamado + 1;
            tabelaTipo = await db.query(sqlEquip);
            tabelaUser = await db.query(sqlUsuarios);
            tabelaSetor = await db.query(sqlSetor);
            tabelaEquip = await db.query(sql);
            numeroChamado = proximoChamado // Atribua o valor dentro da função
        }

        await listarchamados();
         // Suponha que você tenha uma configuração para o banco de dados

        // Função para buscar o nome com base no email
        async function buscarNomePorEmail(email) {
            try {
                const result = await db.query('SELECT nome FROM usuarios WHERE email = $1', [email]);
                if (result.rows.length > 0) {
                    return result.rows[0].nome; // Retorna o nome se o email for encontrado
                } else {
                    return null; // Retorna null se o email não for encontrado
                }
            } catch (error) {
                throw error;
            }
        }
        
        console.log(email)
        const nome = await buscarNomePorEmail(email);
        console.log(email)
        res.render('novo-chamado', { 
            equipamentos: tabelaEquip.rows, 
            setores: tabelaSetor.rows, 
            tipo: tabelaTipo.rows, 
            numeroChamado, 
            usuarios: tabelaUser.rows, 
            nome: nome // Passa o nome como parâmetro
        });
    } catch (error) {
        res.status(500).send("Erro ao buscar os dados: " + error.message);
    }
});


router.get("/inicio", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/home.html"))
})
// router.get('/teste', function (req, res) {
//     res.render('user')
// })

// router.get("/equipamentos", function (req, res) {
//     res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
// })

router.post('/cadastro/equipamento', function (req, res) {
    novoEquip.insertEquip(req.body.tag, req.body.tipo, req.body.modelo, req.body.ns, req.body.area, req.body.local, req.body.setor, req.body.desc).then(function () {
        res.redirect('/equipamentos')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.post('/cadastro/setor', function (req, res) {
    novoSetor.insertSetor(req.body.nome_setor).then(function () {
        res.redirect('/cadastro')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.post('/cadastro/chamado', function (req, res) {
    novoChamado.insertChamado(req.body.status, req.body.tag, req.body.titleDesc, req.body.prioridade, req.body.criador,req.body.email, req.body.dataChamado, req.body.horaChamado, req.body.desc).then(function () {
        res.redirect('/novo-chamado')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
// router.post('/cadastro/chamado', function (req, res) {
//     res.send( req.body.chamado +  req.body.status + req.body.titleDesc + req.body.tag + req.body.prioridade +  req.body.criador + req.body.dataChamado +  req.body.horaChamado + req.body.desc)
// })
router.post('/cadastro/tecnico', function (req, res) {
    novoTec.insertTecnico(req.body.nome_tec, req.body.mat_tec, req.body.email_tec).then(function () {
        res.redirect('/cadastro')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.post('/cadastro/tipo', function (req, res) {
    novoTipo.insertTipo(req.body.nome_tipo).then(function () {
        res.redirect('/cadastro')
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})
router.post('/novoUsuario', function (req, res) {
    novoUser.insertUser(req.body.nome, req.body.email).then(function () {
        res.sendFile(path.join(__dirname, "./public/pages/manut.html"))
    }).catch(function (error) {
        res.send("deu erro " + error)
    })
})

router.get("/manutencao", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/manut.html"))
})
router.get("/ordem", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/ordem.html"))
})
router.get("/consulta_ordem", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/consulta-ordem.html"))
})
router.get("/chamados", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/chamado.html"))
})
router.get("/registro", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/cadastro.html"))
})
router.get("/relatorio", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
router.get("/graficos", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
router.get("/chat", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/chat.html"))
})


module.exports = router