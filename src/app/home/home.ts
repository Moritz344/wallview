import { Component,inject,signal } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { Settings } from '../settings';
import { Wallpaper } from '../wallpaper/wallpaper';
import { Electron } from '../electron';

// TODO: browse local wallpapers
// TODO: browse wallhaven wallpapers
// TODO: view wallpaper

@Component({
  selector: 'app-home',
  imports: [Topbar,Wallpaper],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public settings = inject(Settings);
  public electron = inject(Electron);

  public tab = this.settings.selectedTab;

  public readonly loadQuantity = signal<number>(5);

  public localWallpapers = signal<string[]>([]);
  public currentLoadedLocalWallpapers = signal<string[]>([]);

  public wallhavenWallpapers = signal<string[]>([]);
  public currentLoadedWallhavenWallpapers = signal<string[]>([]);

  public isLoading = signal<boolean>(false);

  constructor() {
    this.initWallpapers();
  }

  initWallpapers() {
    if (this.tab() == "local") {
      this.searchLocalWallpapers();
    } else {
      this.searchWallhavenWallpapers();
    }
  }


  loadMoreLocalWallpapers() {
    const newLoadedWallpapers = this.localWallpapers().slice(0,this.currentLoadedLocalWallpapers().length + this.loadQuantity())
    this.currentLoadedLocalWallpapers.set(newLoadedWallpapers);
  }

  loadMoreWallhavenWallpapers() {}

  onLoadMoreWallpapers() {
    if (this.tab() == "local") {
      this.loadMoreLocalWallpapers();
    } else {
      this.loadMoreWallhavenWallpapers();
    }

  }

  async searchLocalWallpapers() {
    this.isLoading.set(true);
    this.localWallpapers.set(await this.electron.getLocalWallpapers());
    this.currentLoadedLocalWallpapers.set(this.localWallpapers().slice(0,this.loadQuantity()));
    this.isLoading.set(false);
  }

  searchWallhavenWallpapers() {}

}
