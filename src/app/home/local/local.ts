import { Component,OnInit,inject,signal } from '@angular/core';
import { Electron } from '../../electron';

@Component({
  selector: 'app-local',
  imports: [],
  templateUrl: './local.html',
  styleUrl: './local.css',
})
export class Local implements OnInit {
  public electron = inject(Electron);

  public readonly loadQuantity = 50;
  public results = 0;

  public currentLoadedWallpaper = signal<string[]>([]);
  public wallpapers = signal<string[]>([]);

  constructor() {
    this.initLocalWallpapers();
  }

  ngOnInit() {
  }

  onLoadMore() {
    if (this.wallpapers().length <= 50) {
      return;
    }
    this.currentLoadedWallpaper.set(this.wallpapers().slice(0,this.loadQuantity * 2 ));
  }


  async initLocalWallpapers() {
    this.wallpapers.set(await this.electron.getLocalWallpapers());
    this.currentLoadedWallpaper.set(this.wallpapers().slice(0,this.loadQuantity));
    this.results = this.wallpapers().length;
  }

}
