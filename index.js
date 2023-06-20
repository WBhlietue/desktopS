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
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.on("data", (data) => {
    console.log("senddata");
    win.webContents.send("terminal-incData", data);
  });

  ipcMain.on("terminal-into", (event, data) => {
    console.log(data+"_");
    ptyProcess.write(data);
  });
  win.maximize();
  win.loadFile("./src/main/index.html");
};


app.whenReady().then(CreateWindow);
