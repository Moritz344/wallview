import { Component, signal,inject } from '@angular/core';
import { Settings } from './settings';
import { About } from './about/about'
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,About],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public settings = inject(Settings);
  protected readonly title = signal('wallview');
}
