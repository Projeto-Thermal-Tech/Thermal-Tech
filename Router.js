const express=  require("express")
const router = express.Router()
const path = require("path")
const novoEquip = require('../Thermal-Tech/database/db');
const novoSetor = require('../Thermal-Tech/database/db');
const { error } = require("console");
const dados = require('../Thermal-Tech/database/db')

console.log(dados)


router.use(express.static(path.join(__dirname, "/public"))); 

let user={name:'vini', tel:'4444'}


router.get('/teste', (req,res)=>{
    
        res.render('user', user)
 
})




router.get("/inicio", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/home.html"))
})
router.get('/teste', function(req,res){
    res.render('teste')
})

router.get("/equipamentos", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
})

router.post('/cadastro/equipamento', function(req,res){
    novoEquip.insertEquip(req.body.tag,req.body.tipo,req.body.modelo, req.body.ns, req.body.area, req.body.local,req.body.setor, req.body.desc).then(function(){
        res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
    }).catch( function(error){
        res.send("deu erro " + error)
    })
})
router.post('/cadastro/setor', function(req,res){
    novoSetor.insertSetor(req.body.nome_setor).then(function(){
        res.sendFile(path.join(__dirname, "./public/pages/cadastro.html"))
    }).catch( function(error){
        res.send("deu erro " + error)
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