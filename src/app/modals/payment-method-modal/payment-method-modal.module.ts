import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { PaymentMethodModal } from './payment-method.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    PaymentMethodModal
  ],
  exports: [
    PaymentMethodModal
  ]
})
export class PaymentMethodModalModule {}
