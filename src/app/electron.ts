import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Electron {
  constructor() {}

  async exit() {
    return await (window as any).electronAPI.exit();
  }

  async getWallhavenWallpapers(searchParameter: any) {
    return await (window as any).electronAPI.searchWallhaven(searchParameter);
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
