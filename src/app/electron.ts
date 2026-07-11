import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Electron {
  constructor() {}

  async exit() {
    return await (window as any).electronAPI.exit();
  }

  async getLocalWallpapers() {
    return await (window as any).electronAPI.getLocalWallpapers();
  }
}
