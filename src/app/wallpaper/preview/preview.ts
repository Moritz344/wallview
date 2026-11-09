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

  public isLoading = signal<boolean>(true);
  public settings = inject(Settings);
  public electron = inject(Electron);

  public isMarkedAsFavourite = signal<boolean>(false);

  @HostListener("window:keydown",['$event'])
  onClose(event: KeyboardEvent) {
    if (event.key == "Escape") {
      this.close.emit();
    }
  }

  ngOnChanges() {
    this.isLoading.set(true);
    this.checkIfWallpaperIsMarkedAsFavourite();
  }

  async checkIfWallpaperIsMarkedAsFavourite() {
    const favouriteWallpapers = await this.electron.getFavouriteWallpapers();
    if (favouriteWallpapers == undefined || favouriteWallpapers.length == 0) {
      return;
    }

    this.isMarkedAsFavourite.set(favouriteWallpapers.some((x: {path: string,name: string}) => x.path == this.path))
  }

  onFavourite() {
    this.isMarkedAsFavourite.update(fav => !fav);
    this.favourite.emit(this.path);
  }

  onLoad() {
    this.isLoading.set(false);
  }

  constructor() {
    console.log(this.path)
  }
}
