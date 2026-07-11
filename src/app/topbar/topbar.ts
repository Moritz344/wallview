import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from '../settings';
import { Electron }  from '../electron';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  public settings = inject(Settings);
  public electron = inject(Electron);
  public router = inject(Router);

  public tab = this.settings.selectedTab;

  constructor() {}

  onSwitchTab(name: "local" | "browse") {
    this.settings.selectedTab.set(name);
  }

  onClose() {
    this.electron.exit();
  }

}
