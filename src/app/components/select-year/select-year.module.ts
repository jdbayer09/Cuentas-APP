import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectYearComponent } from './select-year.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SelectYearComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectYearComponent
  ]
})
export class SelectYearModule { }
