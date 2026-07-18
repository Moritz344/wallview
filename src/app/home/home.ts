import { Component,inject,signal,OnInit,effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Topbar } from '../topbar/topbar';
import { Settings } from '../settings';
import { Wallpaper } from '../wallpaper/wallpaper';
import { Electron } from '../electron';
import { Wallhaven } from '../wallhaven';
import { SearchParameter, WallpaperFile } from './home.types';
import { Dropdown } from './dropdown/dropdown';

// TODO: contextmenu on wallpapers
// TODO: Downloads Tab

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

  public readonly loadQuantity = signal<number>(24);

  public localWallpapers = signal<WallpaperFile[]>([]);
  public currentLoadedLocalWallpapers = signal<WallpaperFile[]>([]);

  public wallhavenWallpapers = signal<string[]>([]);
  public currentLoadedWallhavenWallpapers = signal<string[]>([]);
  public searchParameter = signal<SearchParameter>({
    q: "",
    categories: [
      { name: "General", value: "100", isChecked: true },
      { name: "Anime",   value: "010", isChecked: true },
      { name: "People",  value: "001", isChecked: true }
    ],
    category: "",
    purity: "100",
    sorting: "toplist",
    order: "desc",
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

  public isLoading = signal<boolean>(false);

  public totalWallhavenPages = signal<number>(0);

  constructor() {
      effect(() => {
        this.settings.localWallpaperPath();
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



  async searchLocalWallpapers() {
    this.isLoading.set(true);
    const wallpapers = await this.electron.getLocalWallpapers();
    const filteredWallpapers = wallpapers
      .filter((wallpaper: { name: string,path: string}) => wallpaper.name.includes(this.searchParameter().q));
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
