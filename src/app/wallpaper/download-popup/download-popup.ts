import { Component,Input,Output,signal,EventEmitter,inject,AfterViewInit,OnDestroy } from '@angular/core';
import { Download } from './download';

@Component({
  selector: 'app-download-popup',
  imports: [],
  templateUrl: './download-popup.html',
  styleUrl: './download-popup.css',
})
export class DownloadPopup implements AfterViewInit,OnDestroy{
  @Input() data: {url: string,name: string} = { url: "",name: ""};
  @Output() close = new EventEmitter<{ url: string,name: string}>();

  public downloadService = inject(Download);

  public timeUntilClose = 5000;
  public intervalId = 0;

  onClose() {
    this.close.emit(this.data);
  }

  constructor() {
  }

  ngOnInit() {
    this.startTimer();
  }

  ngAfterViewInit(): void {
  }


  startTimer() {
    this.intervalId = setInterval(() => {
      this.downloadService.currentDownloads.update(downloads =>
        downloads.filter(d => d.url !== this.data.url)
      );
    }, this.timeUntilClose);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

}
