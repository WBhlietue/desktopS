const { BrowserWindow, app, screen, ipcMain } = require("electron");

const os = require("os");
const pty = require("node-pty");
const CreateWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    //
    //frame: false,
    //
    //f
    //
  });
  var shell = os.platform() === "win32" ? "powershell.exe" : "bash";
  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cwd: process.env.HOME,
    cols: 80,
    rows: 30,
  });
  

  ptyProcess.on("data", (data) => {
    win.webContents.send("terminal-incData", data);
  });

  ipcMain.on("terminal-into", (event, data) => {
    ptyProcess.write(data);
  });
  win.maximize();
  win.loadFile("./src/main/index.html");
};


app.whenReady().then(CreateWindow);
