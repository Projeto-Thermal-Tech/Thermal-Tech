const {app,BrowserWindow,Menu} = require("electron");


function createWindow(){
    const win = new BrowserWindow({
        width:1400, height:900,
        show:false,

    })
    win.loadFile("./public/Login_v1/index.html");
    win.loadFile("./public/index.html");

    win.once('ready-to-show',()=>{
        win.show();
    })

    const menuTemplate =[];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu)

}
app.whenReady().then(()=>{
    createWindow()
})