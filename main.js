const { app, BrowserWindow,net, ipcMain, protocol, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

const wallhavenBaseUrl = "https://wallhaven.cc/api/v1";
let aboutWindow;
let win;


function createWindow() {
  win = new BrowserWindow({
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

function loadAngularRoute(window, route = "") {
  if (process.env.ELECTRON_DEV) {
    window.loadURL(`http://localhost:4200/#/${route}`);
  } else {
    window.loadFile(path.join(__dirname, "dist/launcher/browser/index.html"), {
      hash: route,
    });
  }
}

ipcMain.handle("search-wallhaven",async(_,params) => {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append("q",params.q);
    urlParams.append("sorting",params.sorting);
    urlParams.append("order",params.order);
    urlParams.append("categories",params.categories
      .filter(category => category.isChecked)
      .map(category => category.name.toLowerCase())
      .join(","))
    urlParams.append("resolution",params.resolution);
    urlParams.append("page",params.page);
    console.log(urlParams.toString())

    const response = await fetch(wallhavenBaseUrl + "/search?" + urlParams.toString())
    if (!response) {
      return;
    }

    return await response.json();
  } catch (error) {
    console.log("error",error);
  }
});

ipcMain.handle("close-electron-window",async(_,name) => {
  if (name == "about") {
    aboutWindow.close();
  }

})

ipcMain.handle("get-about-data",async () => {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname,"package.json")));

    return {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author
      }
    } catch (error) {
      console.log("error:", error);
    }
})

ipcMain.handle("open-about",async () => {
   aboutWindow = new BrowserWindow({
      width: 900,
      height: 650,
      frame: false,
      parent: win,
      modal: true,
      webPreferences: {
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    //aboutWindow.openDevTools();
    loadAngularRoute(aboutWindow, "about");
});

ipcMain.handle("open-external", async (_, url) => {
  await shell.openExternal(url);
});

ipcMain.handle("open-wallpaper", async (_, path) => {
  const correctPath = path.split("///")[1];
  shell.showItemInFolder("/" + correctPath);
  console.log("open ", correctPath);
});

ipcMain.handle("exit",(_) => {
  app.quit()
});


ipcMain.handle("get-local-wallpapers",(_) => {
  const pathToLocalWallpapers = path.join(os.homedir() + "/Wallpapers");

  if (!fs.existsSync(pathToLocalWallpapers)) {
    return []
  }
  const allowedFileTypes = ["png","jpg","jpeg"];

  const files = fs.readdirSync(pathToLocalWallpapers,"utf-8");

  let filteredFiles = files.filter( x => allowedFileTypes.includes(x.split(".")[1]));
  return filteredFiles.map(name => ({
    path: "local-wallpaper://" + pathToLocalWallpapers + "/" + name,
    name: name
  }));
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



