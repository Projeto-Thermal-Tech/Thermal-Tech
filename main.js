const {app,BrowserWindow,Menu} = require("electron");
const path = require('path')

function createWindow(){
    const win = new BrowserWindow({
        width:1900, height:1080,
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
   
      }
      
app.whenReady().then(()=>{
    createWindow()
})

  