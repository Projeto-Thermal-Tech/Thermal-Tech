const {app,BrowserWindow,Menu} = require("electron");


function createWindow(){
    const win = new BrowserWindow({
        width:600, height:600,
        show:false,

    })
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