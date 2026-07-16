import { Injectable,signal} from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class Wallhaven {
  public readonly categories = signal<string[]>(["anime","general","people"])
  public readonly sorting = signal<string[]>(["date_added"," relevance", "random"," views", "favorites", "toplist"])
  public readonly orders = signal<string[]>(["asc","desc"]);
  public readonly resolutions = signal<string[]>([
    "1920x1080",
    "1920x1200",
    "2560x1440",
    "2560x1600",
    "3840x2160",
    "1920x1440",
    "2560x1080",
    "3440x1440",
    "3840x1600",
  ]);

  constructor() {}


}
