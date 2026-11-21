import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  public show = signal<boolean>(false);
  public text = signal<string>("");
  public position = signal<number[]>([0,0]);
  public delay = signal<number>(800);
  public delayLeave = signal<number>(250);
  public timeout?: ReturnType<typeof setTimeout>;


  showTooltip(text: string,event: MouseEvent) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.show.set(true);
      this.position.set([event.x + event.offsetX,event.y + event.offsetY])
      this.text.set(text);
    }, this.delay());
  }

  resetTooltip() {
    this.text.set("");
    this.position.set([]);
    this.show.set(false);
  }

  hideTooltip() {
    clearTimeout(this.timeout);
    setTimeout(() => {
      this.resetTooltip();
    },this.delay())
  }

}
