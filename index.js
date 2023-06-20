const { BrowserWindow, app, screen } = require("electron");
const CreateWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        
        //frame: false,
    });
    win.maximize();
    win.loadFile("./src/main/index.html");
};
app.whenReady().then(CreateWindow);
