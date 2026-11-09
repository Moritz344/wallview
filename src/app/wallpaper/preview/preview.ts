import { Component,HostListener,signal,Input,inject,Output,OnChanges, EventEmitter } from '@angular/core';
import { Settings } from '../../settings';
import { Electron } from '../../electron';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
})
export class Preview implements OnChanges {
  @Input() path = signal<string>("");
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<string>();
  @Output() favourite = new EventEmitter<string>();
  @Output() next = new EventEmitter<string>();
  @Output() prev = new EventEmitter<string>();

  public isLoading = signal<boolean>(true);
  public settings = inject(Settings);
  public electron = inject(Electron);

  @HostListener("window:keydown",['$event'])
  onClose(event: KeyboardEvent) {
    if (event.key == "Escape") {
      this.close.emit();
    }
  }

  ngOnChanges() {
    this.isLoading.set(true);
  }

  onLoad() {
    this.isLoading.set(false);
  }

  constructor() {
    console.log(this.path())
  }
}
