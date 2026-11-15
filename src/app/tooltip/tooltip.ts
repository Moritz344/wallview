import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipService } from '../tooltip-service';

@Component({
  selector: 'app-tooltip',
  imports: [FormsModule,CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
})
export class Tooltip {
  public tooltip = inject(TooltipService)
  public readonly duration = 500;

  constructor() {
  }

}
