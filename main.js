const { app,dialog, BrowserWindow,net, ipcMain, protocol, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

const wallhavenBaseUrl = "https://wallhaven.cc/api/v1";
let aboutWindow;
let win;
let store;

const defaultLocalWallpaperPath = path.join(os.homedir() + "/Wallpapers");

async function initStore() {
  const StoreModule = await import("electron-store");
  store = new StoreModule.default();
}

function getLocalWallpaperPath() {
  return store.get("localWallpaperPath");
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (process.env.ELECTRON_DEV) {
    win.loadURL("http://localhost:4200/");
    //win.webContents.openDevTools();
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

    const general = params.categories.find(c => c.name === "General")?.isChecked ? "1" : "0";
    const anime = params.categories.find(c => c.name === "Anime")?.isChecked ? "1" : "0";
    const people = params.categories.find(c => c.name === "People")?.isChecked ? "1" : "0";
    urlParams.append("categories", general + anime + people);

    urlParams.append("resolutions",params.resolution);
    urlParams.append("purity", params.purity);
    urlParams.append("page",params.page);
    console.log(urlParams);

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
    aboutWindow = null;
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
   if (aboutWindow) { return; }
   aboutWindow = new BrowserWindow({
      maxWidth: 400,
      maxHeight: 200,
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

ipcMain.handle("open-wallpaper", async (_, fullPath) => {
  let correctPath = (fullPath) ? "/" + fullPath.split("///")[1] : getLocalWallpaperPath() || defaultLocalWallpaperPath ;
  if (fullPath) {
    shell.showItemInFolder(correctPath);
  } else {
    shell.openPath(correctPath);
  }
});

ipcMain.handle("exit",(_) => {
  app.quit()
});

ipcMain.handle("minimize", (_) => {
  BrowserWindow.getFocusedWindow()?.minimize()
});

ipcMain.handle("open-local-wallpaper",async() => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const path = result.filePaths[0];
    store.set("localWallpaperPath",path);
    return path;
  }
  return null;
});

ipcMain.handle("download-wallpaper",async(_,url) => {
  try {
    const response = await net.fetch(url);
    if (!response.ok) { return {success: false }; }

    const buffer = Buffer.from(await response.arrayBuffer());
    const pathToSaveWallpaperIn = (getLocalWallpaperPath()) ? getLocalWallpaperPath() : defaultLocalWallpaperPath;

    const fileName = url.split("/").at(-1);
    const filePath = path.join(pathToSaveWallpaperIn, fileName);

    if (!fs.existsSync(pathToSaveWallpaperIn)) { return { success: false }}
    fs.writeFileSync(filePath,buffer);
    return {
      name: fileName,
      success: true
    }


  } catch(error) {
    console.log("error: ",error);

  }
})

ipcMain.handle("get-local-wallpapers",(_) => {
  const storedPath = getLocalWallpaperPath();

  const pathToLocalWallpapers = (storedPath) ? storedPath : getLocalWallpaperPath();

  if (!fs.existsSync(pathToLocalWallpapers)) {
    return []
  }
  const allowedFileTypes = ["png","jpg","jpeg"];

  const files = fs.readdirSync(pathToLocalWallpapers,"utf-8");

  let filteredFiles = files.filter( x => allowedFileTypes.includes(x.split(".")[1]));

  return filteredFiles.map(name => {
    const fullPath = path.join(pathToLocalWallpapers, name);
    const stat = fs.statSync(fullPath);
    return {
      path: "local-wallpaper://" + fullPath,
      name,
      modified: new Date(stat.mtime).getTime(),
      created: new Date(stat.birthtime).getTime(),
    };
  });
});


app.whenReady().then(async() => {
  protocol.handle("local-wallpaper", (request) => {
    const filePath = decodeURIComponent(request.url.slice("local-wallpaper://".length));
    return net.fetch("file://" + filePath);
  });
  createWindow();
  await initStore();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});



