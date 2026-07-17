import { Component,inject,signal } from '@angular/core';
import { Electron } from '../electron'

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private electron = inject(Electron);

  public data = signal<any>({});

  constructor() {
    this.initData();
  }

  openGithub() {
    this.electron.openExternalLink("https://github.com/Moritz344");
  }

  onClose() {
    this.electron.closeWindow("about");
  }

  async initData() {
    this.data.set(await this.electron.getAboutData());
    console.log(this.data());
  }

}
