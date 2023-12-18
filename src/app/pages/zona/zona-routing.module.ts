import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonaPage } from './zona.page';

const routes: Routes = [
  {
    path: '',
    component: ZonaPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'payment-methods',
        loadChildren: () => import('./payment-methods/payment-methods.module').then( m => m.PaymentMethodsPageModule)
      },
      {
        path: 'balances',
        loadChildren: () => import('./balances/balances.module').then( m => m.BalancesPageModule)
      },
      {
        path: 'costs',
        loadChildren: () => import('./costs/costs.module').then( m => m.CostsPageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
      },
      {
        path: '',
        redirectTo: '/z/home',
        pathMatch: 'full'
      }
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonaPageRoutingModule {}
