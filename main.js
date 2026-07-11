const { app, BrowserWindow,net, ipcMain, protocol, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (process.env.ELECTRON_DEV) {
    win.loadURL("http://localhost:4200/");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(app.getAppPath(), 'dist/'));
  }

}

ipcMain.handle("open-external", async (_, url) => {
  await shell.openExternal(url);
});

ipcMain.handle("exit",(_) => {
  app.quit()
});

ipcMain.handle("get-local-wallpapers",(_) => {
  const pathToLocalWallpapers = path.join(os.homedir() + "/Wallpapers");
  let files = fs.readdirSync(pathToLocalWallpapers,"utf-8");
  files = files.map(x => "local-wallpaper://" + pathToLocalWallpapers + "/" + x)
  return files;
});


app.whenReady().then(() => {
  protocol.handle("local-wallpaper", (request) => {
    const filePath = decodeURIComponent(request.url.slice("local-wallpaper://".length));
    return net.fetch("file://" + filePath);
  });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});



