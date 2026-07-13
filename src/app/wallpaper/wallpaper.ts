import { Component,HostListener,OnInit,inject,signal,Input,Output,EventEmitter } from '@angular/core';
import { Electron } from '../electron';

@Component({
  selector: 'app-wallpaper',
  imports: [],
  templateUrl: './wallpaper.html',
  styleUrl: './wallpaper.css',
})
export class Wallpaper implements OnInit {
  @Input() wallpapers = signal<any[]>([]);
  @Input() mode: "load-more" | "pagination" = "load-more";
  @Input() showInFolderOption: boolean = false;
  @Input() type: "local" | "wallhaven" = "local";

  @Output() loadMore = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();

  public electron = inject(Electron);

  public wallpaperToShowFullscreen = signal<string>("");
  public showFullscreenMode = signal<boolean>(false);

  constructor() {
  }

  downloadWallpaper(path: string) {}

  showWallpaper(path: string) {
    this.electron.openWallpaperInFolder(path);
  }

  onWallpaper(wallpaper: { path: string,name: string}) {
    if (this.type == "local") {
      this.showWallpaper(wallpaper.path);
    } else {
      this.downloadWallpaper(wallpaper.path);
    }
  }

  onShowFullscreen(path: string) {
    console.log(path);
    this.wallpaperToShowFullscreen.set(path);
    this.showFullscreenMode.set(true);
  }

  onCloseFullscreen() {
    this.showFullscreenMode.set(false);
  }

  @HostListener("document:keydown.escape")
  onEscape() {
    console.log("close")
    this.showFullscreenMode.set(false);
  }

  onNextPage() {
    this.nextPage.emit();
  }

  onPrevPage() {
    this.prevPage.emit();
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  onOpenWallpaperInFolder() {
    this.electron.openWallpaperInFolder(this.wallpaperToShowFullscreen());
  }

  ngOnInit(): void {
  }



}
