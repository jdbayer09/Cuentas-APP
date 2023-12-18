import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostsPageRoutingModule } from './costs-routing.module';

import { CostsPage } from './costs.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostsPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [CostsPage]
})
export class CostsPageModule {}
