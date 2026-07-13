import { Component,inject,signal } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from '../settings';
import { Electron }  from '../electron';
import { Menu } from './menu/menu'

@Component({
  selector: 'app-topbar',
  imports: [Menu],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  public settings = inject(Settings);
  public electron = inject(Electron);
  public router = inject(Router);

  public tab = this.settings.selectedTab;
  public menuSelected = signal<boolean>(false);

  constructor() {}

  onSwitchTab(name: "local" | "browse") {
    this.settings.selectedTab.set(name);
  }

  onClose() {
    this.electron.exit();
  }

}
