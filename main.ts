const {app,BrowserWindow,Menu} = require("electron");
const path = require('path')
const express=  require("express")
const server = express()
const router = require('./Router')


server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.set('views', path.join(__dirname, './public/views'));
server.set('view engine','ejs')

server.use(router)
server.listen(5000)


function createWindow(){
    const win = 
    new BrowserWindow({
        width:1920, height:1080,
        show:false,
         icon: path.join(__dirname, './public/assets/icon_logo.jpg')
    })

    // win.loadFile("seila.html");
    win.loadFile("./public/Login_v1/index.html");

    win.once('ready-to-show',()=>{
        win.show();
        win.maximize()
    })

    const menuTemplate =[];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu)
    // win.openDevTools();

      }
      
app.whenReady().then(()=>{
    createWindow()
})

  