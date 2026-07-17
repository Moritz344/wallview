import { Component,HostListener,OnInit,inject,signal,Input,Output,EventEmitter } from '@angular/core';
import { Electron } from '../electron';
import { DownloadPopup } from './download-popup/download-popup';
import { Download } from './download-popup/download';

@Component({
  selector: 'app-wallpaper',
  imports: [DownloadPopup],
  templateUrl: './wallpaper.html',
  styleUrl: './wallpaper.css',
})
export class Wallpaper implements OnInit {
  @Input() wallpapers = signal<any[]>([]);
  @Input() mode: "load-more" | "pagination" = "load-more";
  @Input() showInFolderOption: boolean = false;
  @Input() type: "local" | "wallhaven" = "local";
  @Input() wallpapersTotal: number = 0;

  @Output() load = new EventEmitter<"less" | "more">();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();
  @Input() pageData: { page: number,total: number} = {page:0,total: 0};

  public electron = inject(Electron);
  public downloadService = inject(Download);

  public wallpaperToShowFullscreen = signal<string>("");
  public showFullscreenMode = signal<boolean>(false);

  constructor() {
  }

  async downloadWallpaper(path: string) {
    const isAlreadyBeingDownloaded = this.downloadService.currentDownloads().some((download: any) => download.url == path);
    if (isAlreadyBeingDownloaded) { return; }

    this.downloadService.currentDownloads
      .update((values: any) => [...values,{ name: path.split("/").at(-1),url: path}])
    await this.electron.downloadWallpaper(path);
  }

  showWallpaper(path: string) {
    this.electron.openWallpaperInFolder(path);
  }

  onCloseDownloadPopup(popup: { url: string,name: string}) {
    this.downloadService.currentDownloads.update(downloads =>
      downloads.filter((x: any) => x !== popup)
    );
  }


  onWallpaper(wallpaper: any) {
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

  onOpenExternal(url: string) {
    this.electron.openExternalLink(url);
  }

  onNextPage() {
    this.nextPage.emit();
  }

  onPrevPage() {
    this.prevPage.emit();
  }

  onLoadMore() {
    this.load.emit("more");
  }

  onLoadLess() {
    this.load.emit("less");
  }

  onOpenWallpaperInFolder() {
    this.electron.openWallpaperInFolder(this.wallpaperToShowFullscreen());
  }

  ngOnInit(): void {
  }



}
