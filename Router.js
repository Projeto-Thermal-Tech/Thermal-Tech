const express = require("express")
const router = express.Router()
const path = require("path")
const novoEquip = require('../Thermal-Tech/database/db');
const novoSetor = require('../Thermal-Tech/database/db');
const dados = require('../Thermal-Tech/database/db');
const { error } = require("console");
const db = require("./database/cnx")

router.use(express.static(path.join(__dirname, "/public")));

let user = { name: 'vini', tel: '4444' }


router.get("/cadastro", async function (req, res) {
    try {
        let tabela; // Declare a variável fora da função

        async function listarDados() {
            const sql = "select * from setor";
            tabela = await db.query(sql); // Atribua o valor dentro da função
            console.log(tabela.rows)
        }

        await listarDados(); // Espere até que a função listarDados seja concluída

        res.render('user', { setores: tabela.rows }); // Agora a variável tabela está acessível aqui
    } catch (error) {
        res.status(500).send("Erro ao buscar os dados da tabela setor: " + error.message);
    }
});

router.get("/inicio", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/home.html"))
})
// router.get('/teste', function (req, res) {
//     res.render('user')
// })

router.get("/equipamentos", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
})

router.post('/cadastro/equipamento', function (req, res) {
    novoEquip.insertEquip(req.body.tag, req.body.tipo, req.body.modelo, req.body.ns, req.body.area, req.body.local, req.body.setor, req.body.desc).then(function () {
        res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
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
router.get("/manutencao", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/manut.html"))
})
router.get("/ordem", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/pages/ordem.html"))
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
router.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/Login_v1/index.html"))
})


module.exports = router