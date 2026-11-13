import { Component,HostListener,signal,Input,inject,Output,OnChanges, EventEmitter } from '@angular/core';
import { Settings } from '../../settings';
import { Electron } from '../../electron';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
})
export class Preview implements OnChanges {
  @Input() path = "";
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<string>();
  @Output() favourite = new EventEmitter<string>();
  @Output() next = new EventEmitter<string>();
  @Output() prev = new EventEmitter<string>();

  public settings = inject(Settings);
  public electron = inject(Electron);

  public name = ""
  public isLoading = signal<boolean>(true);
  public isMarkedAsFavourite = signal<boolean>(false);
  public isDownloaded = signal<boolean>(false);

  @HostListener("window:keydown",['$event'])
  onClose(event: KeyboardEvent) {
    if (event.key == "Escape") {
      this.close.emit();
    }
  }

  ngOnChanges() {
    this.isLoading.set(true);
    this.name = this.path.split("/").at(-1) ?? ""
    this.checkIfWallpaperIsMarkedAsFavourite();
    this.checkIfWallpaperIsDownloaded();
  }

  async checkIfWallpaperIsDownloaded() {
    const localWallpapers = await this.electron.getLocalWallpapers();
    let isLocalWallpaper = false
    if (this.path.includes("local-wallpaper")) {
      isLocalWallpaper = true
    } else {
      isLocalWallpaper = localWallpapers.some((x: any) => x.name == this.name)
    }
    this.isDownloaded.set(isLocalWallpaper)

  }

  async onOpenPath() {
    if (this.path.includes("local-wallpaper")) {
      this.electron.openWallpaperInFolder(this.path)
    } else {
      this.electron.openWallpaperInFolder("local-wallpaper://" +this.settings.localWallpaperPath() + "/" + this.name)
    }
  }

  async checkIfWallpaperIsMarkedAsFavourite() {
    const favouriteWallpapers = await this.electron.getFavouriteWallpapers();
    if (favouriteWallpapers == undefined || favouriteWallpapers.length == 0) {
      return;
    }

    this.isMarkedAsFavourite.set(favouriteWallpapers.some((x: {path: string,name: string}) => x.path == this.path))
  }

  onDownload() {
    this.isDownloaded.set(true);
    this.download.emit(this.path)
  }

  onFavourite() {
    this.isMarkedAsFavourite.update(fav => !fav);
    this.favourite.emit(this.path);
  }

  onLoad() {
    this.isLoading.set(false);
  }

  constructor() {
  }
}
