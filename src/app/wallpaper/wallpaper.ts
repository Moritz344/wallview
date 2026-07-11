import { Component,OnInit,inject,signal,Input,Output,EventEmitter } from '@angular/core';
import { Electron } from '../electron';

@Component({
  selector: 'app-wallpaper',
  imports: [],
  templateUrl: './wallpaper.html',
  styleUrl: './wallpaper.css',
})
export class Wallpaper implements OnInit {
  @Input() wallpapers = signal<string[]>([]);
  @Output() loadMore = new EventEmitter<void>();

  public electron = inject(Electron);
  public readonly loadQuantity = 50;
  public results = 0;

  public wallpaperToShowFullscreen = signal<string>("");
  public showFullscreenMode = signal<boolean>(false);

  constructor() {
  }

  onShowFullscreen(path: string) {
    this.wallpaperToShowFullscreen.set(path);
    this.showFullscreenMode.set(true);
  }

  onCloseFullscreen() {
    this.showFullscreenMode.set(false);
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  ngOnInit(): void {
  }


}
