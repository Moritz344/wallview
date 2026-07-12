import { Component,inject,signal,OnInit,effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Topbar } from '../topbar/topbar';
import { Settings } from '../settings';
import { Wallpaper } from '../wallpaper/wallpaper';
import { Electron } from '../electron';
import { Wallhaven } from '../wallhaven';

// TODO: browse local wallpapers
// TODO: browse wallhaven wallpapers
// TODO: view wallpaper

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
      { name: "anime",isChecked: true },
      { name: "people",isChecked: true },
      { name: "general",isChecked: true }
    ],
    purity: 0,
    sorting: "views",
    order: "desc",
    topRange: "1M",
    atleast: "1920x1080",
    resolution: "1920x1080",
    page: 1
  });

  public isLoading = signal<boolean>(false);

  constructor() {
      effect(() => {
        this.tab();
        this.initWallpapers();
    });

  }

  ngOnInit() {
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

  nextPage() {
    this.searchParameter().page += 1;
    this.searchWallhavenWallpapers();
  }

  prevPage() {
    this.searchParameter().page -= 1;
    this.searchWallhavenWallpapers();
  }

  onChangeCategory(name: string, isChecked: boolean) {
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

  searchWallhavenWallpapers() {
    this.isLoading.set(true);
    this.wallhaven.search(this.searchParameter()).subscribe({
      next: (response: any) => {
        this.wallhavenWallpapers.set(response.data);
        this.currentLoadedWallhavenWallpapers.set(this.wallhavenWallpapers().slice(0,this.loadQuantity()))
        this.isLoading.set(false);
        console.log(this.currentLoadedWallhavenWallpapers());
      }, error: (error: any) => {
        console.log("error:",error);
      }
    });
  }

}
