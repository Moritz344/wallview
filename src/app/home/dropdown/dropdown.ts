import { Component,Input,Output,signal,OnInit,EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown implements OnInit,ControlValueAccessor {
  @Input() data: string[] = [];
  @Input() selectedValue: string[] | string = [];
  @Output() selectedValueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();
  @Input() mode: "simple" | "multiple" = "simple";

  public showMore = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
  }

  onSelect(option: string) {
    if (this.mode == "simple") {
      this.selectSimpleOption(option);
    } else {
      this.selectMulitpleOption(option);
    }
  }

  selectSimpleOption(option: string) {
    this.selectedValueChange.emit(option);
    this.search.emit();
    this.onToggleMore();
  }

  selectMulitpleOption(option: string) {
    const optionChecked = (this.selectedValue as string[]).some((x: string) => x == option)

    if (optionChecked && this.selectedValue.length == 1) { return; }

    if (optionChecked) {
      (this.selectedValue as string[]).splice(this.selectedValue.indexOf(option),1);
    } else {
      (this.selectedValue as string[]).push(option);
    }
    this.search.emit();
  }

  onToggleMore() {
    this.showMore.update((x: boolean) => !x);
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }


}
