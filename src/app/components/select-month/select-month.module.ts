import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMonthComponent } from './select-month.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SelectMonthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectMonthComponent
  ]
})
export class SelectMonthModule { }
