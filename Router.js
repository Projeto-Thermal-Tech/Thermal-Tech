const express=  require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, "/public"))); // Substitua "public" pelo nome da pasta onde estão os arquivos estáticos (CSS, JS, imagens, etc.)

app.get("/inicio", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/home.html"))
})

app.get("/equipamentos", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/lista.html"))
})
app.get("/manutencao", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/manut.html"))
})
app.get("/ordem", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/ordem.html"))
})
app.get("/chamados", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/chamado.html"))
})
app.get("/registro", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/cadastro.html"))
})
app.get("/relatorio", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
app.get("/graficos", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/horas.html"))
})
app.get("/chat", function (req,res){
    res.sendFile(path.join(__dirname, "./public/pages/chat.html"))
})
app.get("/login", function (req,res){
    res.sendFile(path.join(__dirname, "./public/Login_v1/index.html"))
})


app.listen(5000)