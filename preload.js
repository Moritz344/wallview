const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exit: () => ipcRenderer.invoke("exit"),
  minimize: () => ipcRenderer.invoke("minimize"),
  getLocalWallpapers: () => ipcRenderer.invoke("get-local-wallpapers"),
  openWallpaper: (path) => ipcRenderer.invoke("open-wallpaper",path),
  openExternalLink: (url) => ipcRenderer.invoke("open-external",url),
  openAboutWindow: () => ipcRenderer.invoke("open-about"),
  getAboutData: () => ipcRenderer.invoke("get-about-data"),
  openLocalWallpaperPath: () => ipcRenderer.invoke("open-local-wallpaper"),
  closeElectronWindow: (name) => ipcRenderer.invoke("close-electron-window",name),
  searchWallhaven: (params) => ipcRenderer.invoke("search-wallhaven",params),
  downloadWallpaper: (path) => ipcRenderer.invoke("download-wallpaper",path),
});
