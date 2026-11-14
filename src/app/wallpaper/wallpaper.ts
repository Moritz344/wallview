import { Component,inject,signal,Input,Output,EventEmitter } from '@angular/core';
import { Electron } from '../electron';
import { DownloadPopup } from './download-popup/download-popup';
import { Download } from './download-popup/download';
import { Settings } from '../settings'
import { Preview } from './preview/preview';

@Component({
  selector: 'app-wallpaper',
  imports: [DownloadPopup,Preview],
  templateUrl: './wallpaper.html',
  styleUrl: './wallpaper.css',
})
export class Wallpaper {
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
  public settings = inject(Settings);

  public wallpaperToShowFullscreen = signal<string>("");

  public showPreview = signal<boolean>(false);
  public previewPath = signal<string>("");
  public previewThumb = signal<string>("");

  constructor() {
  }


  async downloadWallpaper(path: string) {
    const isAlreadyBeingDownloaded = this.downloadService.currentDownloads().some((download: any) => download.url == path);
    if (isAlreadyBeingDownloaded) { return; }

    this.downloadService.currentDownloads
      .update((values: any) => [...values,{ name: path.split("/").at(-1),url: path}])
    await this.electron.downloadWallpaper(path);
  }


  onCloseDownloadPopup(popup: { url: string,name: string}) {
    this.downloadService.currentDownloads.update(downloads =>
      downloads.filter((x: any) => x !== popup)
    );
  }

  async onChangeLocalWallpaperPath() {
    const newPath = await this.electron.changeLocalWallpaperPath();
    if (!newPath) {
      return;
    }
    this.settings.localWallpaperPath.set(newPath);
  }

  onWallpaper(wallpaper: any) {
      this.showPreview.set(true);
      this.setPreview(wallpaper);
      console.log(wallpaper);
  }

  private setPreview(wallpaper: any) {
    this.previewPath.set(wallpaper.path);
  }

  onNextWallpaperForPreview() {
    const currentWallpaperPosition = this.wallpapers().findIndex((x: any) => x.path == this.previewPath())
    if (currentWallpaperPosition == this.wallpapers().length - 1) {
      return;
    }
    this.setPreview(this.wallpapers()[currentWallpaperPosition + 1]);
  }

  onPreviousWallpaperForPreview() {
    const currentWallpaperPosition = this.wallpapers().findIndex((x: any) => x.path == this.previewPath())
    if (currentWallpaperPosition == 0) {
      return;
    }
    this.setPreview(this.wallpapers()[currentWallpaperPosition - 1]);
  }

  async onFavourite(path: string) {
    const name = path.split("/").at(-1) ?? "";
    await this.electron.updateFavouriteWallpaper({path: path,name: name});
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




}
