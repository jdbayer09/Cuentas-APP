import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentMethodsPageRoutingModule } from './payment-methods-routing.module';

import { PaymentMethodsPage } from './payment-methods.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { PaymentMethodModalModule } from 'src/app/modals/payment-method-modal/payment-method-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentMethodsPageRoutingModule,
    HeaderComponentModule,
    PaymentMethodModalModule
  ],
  declarations: [PaymentMethodsPage]
})
export class PaymentMethodsPageModule {}
