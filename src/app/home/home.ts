import { Component,inject,signal,OnInit,effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Topbar } from '../topbar/topbar';
import { Settings } from '../settings';
import { Wallpaper } from '../wallpaper/wallpaper';
import { Electron } from '../electron';
import { Wallhaven } from '../wallhaven';

// TODO: download wallhavenw wallpapers
// TODO: open wallpaper in folder
// TODO: change local wallpaper folder
//
// TODO: double click on local wallpaper => open in folder
// TODO: double click on wallhaven wallpaper => download
// TODO: show page number for wallhaven instead of loaded images

@Component({
  selector: 'app-home',
  imports: [Topbar,Wallpaper,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public settings = inject(Settings);
  public electron = inject(Electron);
  public wallhaven = inject(Wallhaven);

  public tab = this.settings.selectedTab;

  public readonly loadQuantity = signal<number>(24);

  public localWallpapers = signal<any[]>([]);
  public currentLoadedLocalWallpapers = signal<any[]>([]);

  public wallhavenWallpapers = signal<string[]>([]);
  public currentLoadedWallhavenWallpapers = signal<string[]>([]);
  public searchParameter = signal<any>({
    q: "",
    categories: [
      { name: "Anime",isChecked: true },
      { name: "People",isChecked: true },
      { name: "General",isChecked: true }
    ],
    purity: 0,
    sorting: "toplist",
    order: "desc",
    topRange: "1M",
    atleast: "1920x1080",
    resolution: "1920x1080",
    page: 1
  });

  public isLoading = signal<boolean>(false);

  public totalWallhavenPages = signal<number>(0);

  constructor() {
      effect(() => {
        this.tab();
        this.initWallpapers();
    });

  }

  ngOnInit() {}

  initWallpapers() {
    if (this.tab() == "local") {
      this.searchLocalWallpapers();
    } else {
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
    this.searchParameter().page += 1;
    this.searchWallhavenWallpapers();
  }

  prevPage() {
    this.searchParameter().page -= 1;
    this.searchWallhavenWallpapers();
  }

  onChangeCategory(name: string, isChecked: boolean) {
    const uncheckedCategories = this.searchParameter().categories.filter((category: any) => !category.isChecked);
    if (uncheckedCategories.length == 2 && isChecked) {
      return;
    }
    let selected = !isChecked;
    this.searchParameter.update(paremeter => ({
      ...paremeter,
      categories: paremeter.categories.map((c: any) =>
        c.name === name ? { ...c, isChecked: selected } : c
      )
    }));
  }



  async searchLocalWallpapers() {
    this.isLoading.set(true);
    const wallpapers = await this.electron.getLocalWallpapers();
    let filteredWallpapers = wallpapers.filter((wallpaper: { name: string,path: string}) => wallpaper.name.includes(this.searchParameter().q));
    this.localWallpapers.set(filteredWallpapers);
    this.currentLoadedLocalWallpapers.set(this.localWallpapers().slice(0,this.loadQuantity()));
    this.isLoading.set(false);
  }

  async searchWallhavenWallpapers() {
    this.isLoading.set(true);
    const response = await this.electron.getWallhavenWallpapers(this.searchParameter());
    this.wallhavenWallpapers.set(response.data);
    this.currentLoadedWallhavenWallpapers.set(this.wallhavenWallpapers().slice(0,this.loadQuantity()));
    this.isLoading.set(false);
    this.totalWallhavenPages.set(response.meta.total);
  }

}
