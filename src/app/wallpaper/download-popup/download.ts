import { Injectable,signal } from '@angular/core';

interface DownloadPopup {
  name: string,
  url: string
}

@Injectable({
  providedIn: 'root',
})
export class Download {
  public currentDownloads = signal<DownloadPopup[]>([]);
  constructor() {}
}
