import { Injectable,signal,inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Settings {
  public router = inject(Router);
  public selectedTab = signal<"local" | "browse">("local");

  constructor() {
    this.router.navigate(["local"]);
  }
}
