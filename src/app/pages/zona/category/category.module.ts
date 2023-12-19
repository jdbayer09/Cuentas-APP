import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { CategoryModalModule } from 'src/app/modals/category-modal/category-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    HeaderComponentModule,
    CategoryModalModule
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
