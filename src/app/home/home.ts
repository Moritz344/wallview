import { Component,inject } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { Settings } from '../settings';
import { Local } from './local/local';
import { Browse } from './browse/browse';

// TODO: browse local wallpapers
// TODO: browse wallhaven wallpapers
// TODO: view wallpaper

@Component({
  selector: 'app-home',
  imports: [Topbar,Local,Browse],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public settings = inject(Settings);
  public tab = this.settings.selectedTab;
  constructor() {}

}
