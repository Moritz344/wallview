import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Electron {
  constructor() {}

  async exit() {
    return await (window as any).electronAPI.exit();
  }

  async minimize() {
    return await (window as any).electronAPI.minimize();
  }

  async getWallhavenWallpapers(searchParameter: any) {
    return await (window as any).electronAPI.searchWallhaven(searchParameter);
  }

  async downloadWallpaper(path: string) {
    return await (window as any).electronAPI.downloadWallpaper(path);
  }

  async changeLocalWallpaperPath() {
    return await (window as any).electronAPI.openLocalWallpaperPath();
  }

  async openAbout() {
    return await (window as any).electronAPI.openAboutWindow();
  }

  async getAboutData() {
    return await (window as any).electronAPI.getAboutData();
  }

  async closeWindow(name: string) {
    return await (window as any).electronAPI.closeElectronWindow(name);
  }

  async openExternalLink(url: string) {
    return await (window as any).electronAPI.openExternalLink(url);
  }

  async getLocalWallpapers() {
    return await (window as any).electronAPI.getLocalWallpapers();
  }

  async openWallpaperInFolder(path: string) {
    return await (window as any).electronAPI.openWallpaper(path);
  }
}
