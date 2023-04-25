const {app,BrowserWindow,Menu} = require("electron");


function createWindow(){
    const win = new BrowserWindow({
        width:1900, height:1080,
        show:false,

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

  