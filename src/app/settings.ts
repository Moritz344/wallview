import { Injectable,signal,inject } from '@angular/core';
import { Router } from '@angular/router';

export type Tab = "local" | "browse" | "fav";

@Injectable({
  providedIn: 'root',
})
export class Settings {
  public router = inject(Router);
  public selectedTab = signal<Tab>("local");
  public localWallpaperPath = signal<string>("");
  public wallhavenSearchError = signal<boolean>(false);

  constructor() {}
}
