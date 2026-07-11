const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exit: () => ipcRenderer.invoke("exit"),
  minmize: () => ipcRenderer.invoke("minimize"),
  getLocalWallpapers: () => ipcRenderer.invoke("get-local-wallpapers"),
});
