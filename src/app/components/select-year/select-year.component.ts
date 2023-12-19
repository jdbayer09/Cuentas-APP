import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss'],
})
export class SelectYearComponent {

  selectedYear  : number = new Date().getFullYear();
  actualYear    : number = new Date().getFullYear();

  @Output() changeVal: EventEmitter<number> = new EventEmitter();
  @Input() disabled: boolean = false;

  @Input() isForm: boolean = false;
  @Input() formControlName: string = '';
  
  constructor() { }

  emmit() {
    this.changeVal.emit(this.selectedYear);
  }

}
