const { BrowserWindow, app, screen, ipcMain } = require("electron");

const os = require("os");
const pty = require("node-pty");
const CreateWindow = (jsonData) => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        minimizable: false,
        autoHideMenuBar: true,
        resizable: false,
        simpleFullscreen: true,

        frame: false,
    });
    var shell = os.platform() === "win32" ? "powershell.exe" : "bash";
    var ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cwd: process.env.HOME,
        cols: 90,
        rows: 30,
    });

    ptyProcess.on("data", (data) => {
        console.log(data);
        try {
            win.webContents.send("terminal-incData", data);
        } catch {}
    });

    ipcMain.on("terminal-into", (event, data) => {
        ptyProcess.write(data);
    });
    ipcMain.on("exit", (event, data) => {
        if (os.platform() === "win32") {
            ptyProcess.kill();
        } else {
            ptyProcess.kill("SIGTERM");
        }
        app.quit();
    });
    ipcMain.on("getData", (event, data) => {
        win.webContents.send("data", { requestName: data, data: jsonData });
    });
    ipcMain.on("toChangeText", (event, data) => {
        win.webContents.send("changeText", data);
    });
    ipcMain.on("backChangeColor", (event, data) => {
        win.webContents.send("backFromText", data);
    });

    win.maximize();
    win.loadFile("./src/main/index.html");
};

app.whenReady().then(() => {
    const fs = require("fs");
    var data = JSON.parse(fs.readFileSync("./data.json"));
    CreateWindow(data);
});
