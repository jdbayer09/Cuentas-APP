import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostsPageRoutingModule } from './costs-routing.module';

import { CostsPage } from './costs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostsPageRoutingModule
  ],
  declarations: [CostsPage]
})
export class CostsPageModule {}
