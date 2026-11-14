import { Injectable,signal,inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchParameter } from './home/home.types';

export type Tab = "local" | "browse" | "fav";

@Injectable({
  providedIn: 'root',
})
export class Settings {
  public router = inject(Router);
  public selectedTab = signal<Tab>("local");
  public localWallpaperPath = signal<string>("");
  public wallhavenSearchError = signal<boolean>(false);
  public searchParameter = signal<SearchParameter>({
    q: "",
    categories: [
      { name: "General", value: "100", isChecked: true },
      { name: "Anime",   value: "010", isChecked: true },
      { name: "People",  value: "001", isChecked: true }
    ],
    category: "",
    purity: "100",
    sorting: "views",
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

  constructor() {}
}
