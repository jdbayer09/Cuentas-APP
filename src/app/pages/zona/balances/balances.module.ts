import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancesPageRoutingModule } from './balances-routing.module';

import { BalancesPage } from './balances.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { SelectMonthModule } from 'src/app/components/select-month/select-month.module';
import { SelectYearModule } from 'src/app/components/select-year/select-year.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalancesPageRoutingModule,
    HeaderComponentModule,
    SelectMonthModule,
    SelectYearModule
  ],
  declarations: [BalancesPage]
})
export class BalancesPageModule {}
