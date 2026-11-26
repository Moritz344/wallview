import { Injectable,signal,inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchParameter } from './home/home.types';
import { WallpaperFile } from './home/home.types';
import { Electron } from './electron';

export type Tab = "local" | "browse" | "fav";

@Injectable({
  providedIn: 'root',
})
export class Settings {
  public router = inject(Router);
  public electron = inject(Electron);

  public selectedTab = signal<Tab>("local");
  public showAboutDialog = signal<boolean>(false);
  public localWallpaperPath = signal<string>("");
  public readonly localOrder = signal<string[]>(["Newest","Oldest"])
  public searchParameter = signal<SearchParameter>({
    q: "",
    categories: [
      { name: "General", value: "100", isChecked: true },
      { name: "Anime",   value: "010", isChecked: true },
      { name: "People",  value: "001", isChecked: true }
    ],
    category: "",
    purity: "100",
    sorting: "views",
    order: "desc",
    localOrder: "Newest",
    topRange: "1M",
    atleast: "1920x1080",
    resolution: [
      "1920x1080",
      "1920x1200",
      "2560x1440",
      "2560x1600",
      "3840x2160",
      "1920x1440",
      "2560x1080",
      "3440x1440",
      "3840x1600",
    ],
    page: 1
  });

  public favouriteWallpapers = signal<{path: string,name: string}[]>([]);
  public currentLoadedFavouriteWallpapers = signal<{path: string,name: string}[]>([]);

  public localWallpapers = signal<WallpaperFile[]>([]);
  public currentLoadedLocalWallpapers = signal<WallpaperFile[]>([]);

  public isLoading = signal<boolean>(false);
  public readonly loadQuantity = signal<number>(24);

  constructor() {}

  private filterWallpaperOrder(filtered: any) {
    if (this.searchParameter().localOrder == "Newest") {
      filtered = filtered.sort((a: any,b: any) => b.created - a.created)
    } else {
      filtered= filtered.sort((a: any,b: any) => a.created - b.created)
    }
    return filtered
  }

  private setTabSpecificVariablesForWallpapers(filtered: any) {
    if (this.selectedTab() == "fav") {
      this.favouriteWallpapers.set(filtered)
      this.currentLoadedFavouriteWallpapers.set(this.favouriteWallpapers().slice(0,this.loadQuantity()))
    } else if (this.selectedTab() == "local") {
      this.localWallpapers.set(filtered);
      this.currentLoadedLocalWallpapers.set(this.localWallpapers().slice(0,this.loadQuantity()));
    }
  }

  async searchWallpapers() {
    if (this.selectedTab() != "fav" && this.selectedTab() != "local") {
      return
    }

    this.isLoading.set(true);
    const wallpaperSource = this.selectedTab() == "fav" ? await this.electron.getFavouriteWallpapers() : await this.electron.getLocalWallpapers()
    let filteredWallpapers = wallpaperSource
      .filter((wallpaper: { name: string,path: string}) => wallpaper.name.includes(this.searchParameter().q))
      .sort((a: any,b: any) => b.created - a.created);

    filteredWallpapers = this.filterWallpaperOrder(filteredWallpapers);
    this.setTabSpecificVariablesForWallpapers(filteredWallpapers);

    this.isLoading.set(false);

  }


  async loadFavouriteWallpapers() {
    const start = 0;
    let end = this.favouriteWallpapers().length + this.loadQuantity();

    let wallpapers = await this.electron.getFavouriteWallpapers();
    wallpapers = wallpapers.slice(start,end);

    this.currentLoadedFavouriteWallpapers.set(wallpapers);
  }


}
