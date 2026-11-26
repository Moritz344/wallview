import { Component,inject,signal,OnInit,effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Topbar } from '../topbar/topbar';
import { Settings } from '../settings';
import { Wallpaper } from '../wallpaper/wallpaper';
import { Electron } from '../electron';
import { Wallhaven } from '../wallhaven';
import { WallpaperFile } from './home.types';
import { Dropdown } from './dropdown/dropdown';

@Component({
  selector: 'app-home',
  imports: [Topbar,Wallpaper,FormsModule,Dropdown],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public settings = inject(Settings);
  public electron = inject(Electron);
  public wallhaven = inject(Wallhaven);

  public tab = this.settings.selectedTab;

  public readonly loadQuantity = this.settings.loadQuantity;

  public localWallpapers = this.settings.localWallpapers;
  public currentLoadedLocalWallpapers = this.settings.currentLoadedLocalWallpapers;

  public favouriteWallpapers = this.settings.favouriteWallpapers;
  public currentLoadedFavouriteWallpapers = this.settings.currentLoadedFavouriteWallpapers;

  public wallhavenWallpapers = signal<string[]>([]);
  public currentLoadedWallhavenWallpapers = signal<string[]>([]);

  public isLoading = this.settings.isLoading;
  public searchParameter = this.settings.searchParameter;

  public totalWallhavenPages = signal<number>(0);


  constructor() {
      effect(() => {
        this.settings.localWallpaperPath();
        this.tab();
        this.initWallpapers();
    });


    this.initWallpaperPath();
  }

  async initWallpaperPath() {
    const path = await this.electron.getLocalWallpaperPath()
    this.settings.localWallpaperPath.set(path);
  }

  ngOnInit() {
  }

  initWallpapers() {
    if (this.tab() == "local" || this.tab() == "fav") {
      this.settings.searchWallpapers()
    } else if (this.tab() == "browse") {
      this.searchWallhavenWallpapers();
    }
  }


  loadLocalWallpapers() {
    const start = 0;
    let end = this.currentLoadedLocalWallpapers().length + this.loadQuantity();

    const newLoadedWallpapers = this.localWallpapers().slice(start,end)
    this.currentLoadedLocalWallpapers.set(newLoadedWallpapers);
  }

  nextPage() {
    if (this.searchParameter().page < this.totalWallhavenPages()) {
      this.searchParameter().page += 1;
      this.searchWallhavenWallpapers();
    }
  }

  prevPage() {
    if (this.searchParameter().page > 1) {
      this.searchParameter().page -= 1;
      this.searchWallhavenWallpapers();
    }
  }

  onChangeCategory(name: string) {
    const categories = this.searchParameter().categories;
    const category = categories.find(c => c.name === name);
    if (!category) return;

    const checkedCount = categories.filter(c => c.isChecked).length;
    if (category.isChecked && checkedCount === 1) return;

    this.searchParameter.update(p => ({
      ...p,
      categories: categories.map(c =>
        c.name === name ? { ...c, isChecked: !c.isChecked } : c
      )
    }));
  }




  async searchWallhavenWallpapers() {
    this.isLoading.set(true);
    const response = await this.electron.getWallhavenWallpapers(this.searchParameter());
    if (response == undefined) {
      this.wallhaven.wallhavenSearchError.set(true);
      this.isLoading.set(false);
      return;
    }
    this.wallhavenWallpapers.set(response.data);
    this.currentLoadedWallhavenWallpapers.set(this.wallhavenWallpapers().slice(0,this.loadQuantity()));
    this.isLoading.set(false);
    this.wallhaven.wallhavenSearchError.set(false);
    this.totalWallhavenPages.set(response.meta.total);
  }


}
