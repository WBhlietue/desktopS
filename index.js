const { BrowserWindow, app, screen } = require("electron");
const CreateWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        
        //hi
        // frame:false
        //hi
        //asd
        //uo
        //
    });
    win.maximize();
    win.loadFile("./src/main/index.html");
};
app.whenReady().then(CreateWindow);
