import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Electron } from '../electron';
import { Settings } from '../settings';

export interface AboutData {
  name: string;
  version: string;
  description: string;
  author?: string;
}

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  public electron = inject(Electron);
  public settings = inject(Settings);

  aboutData = signal<any>([]);
  close = output<void>();

  constructor() {
    this.initData();
  }

  ngOnInit(): void {
  }

  async initData() {
    const data: any = await this.electron.getAboutData();
    this.aboutData.set(data);
  }

  onClose() {
    this.settings.showAboutDialog.set(false);
    this.close.emit();
  }
}

