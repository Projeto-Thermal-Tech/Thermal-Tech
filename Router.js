const express=  require("express")
const router = express.Router()
const path = require("path")
const novoEquip = require('../Thermal-Tech/database/db');
const { error } = require("console");

router.use(express.static(path.join(__dirname, "/public"))); // Substitua "public" pelo nome da pasta onde estão os arquivos estáticos (CSS, JS, imagens, etc.)

router.get("/inicio", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/home.html"))
})

router.get("/equipamentos", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
})

router.post('/cadastro', function(req,res){
    novoEquip.insert(req.body.tag,req.body.tipo,req.body.modelo, req.body.ns, req.body.area, req.body.local,req.body.setor, req.body.desc).then(function(){
        res.send("deu certo")
    }).catch( function(error){
        res.send("deu erro " + req.body.local+ error)
    })
})
router.get("/manutencao", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/manut.html"))
})
router.get("/ordem", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/ordem.html"))
})
router.get("/chamados", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/chamado.html"))
})
router.get("/registro", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/cadastro.html"))
})
router.get("/relatorio", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
router.get("/graficos", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
router.get("/chat", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/chat.html"))
})
router.get("/login", function (req,res){
    res.sendFile(path.join(__dirname, "./public/Login_v1/index.html"))
})


module.exports=router