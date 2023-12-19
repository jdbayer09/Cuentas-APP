import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-month',
  templateUrl: './select-month.component.html',
  styleUrls: ['./select-month.component.scss'],
})
export class SelectMonthComponent {

  selectedMonht : number = new Date().getMonth() + 1;

  @Output() changeVal: EventEmitter<number> = new EventEmitter();
  @Input() disabled: boolean = false;

  @Input() isForm: boolean = false;
  @Input() formControlName: string = '';

  months = [
    {val: 1, name: 'Enero'},
    {val: 2, name: 'Febrero'},
    {val: 3, name: 'Marzo'},
    {val: 4, name: 'Abril'},
    {val: 5, name: 'Mayo'},
    {val: 6, name: 'Junio'},
    {val: 7, name: 'Julio'},
    {val: 8, name: 'Agosto'},
    {val: 9, name: 'Septiembre'},
    {val: 10, name: 'Octubre'},
    {val: 11, name: 'Noviembre'},
    {val: 12, name: 'Diciembre'}
  ];

  constructor() { }

  emmit() {
    this.changeVal.emit(this.selectedMonht);
  }

}
