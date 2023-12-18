import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent   {

  @Input() tittle: string = '';
  @Input() viewAddButton: boolean = false;
  @Output() addEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  addAction() {
    if (this.viewAddButton) {
      this.addEvent.emit(this.viewAddButton);
    }   
  }
}
