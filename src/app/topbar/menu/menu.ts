import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
