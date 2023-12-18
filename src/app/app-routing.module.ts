import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'z',
    pathMatch: 'full'
  },
  {
    path: 'z',
    loadChildren: () => import('./pages/zona/zona.module').then( m => m.ZonaPageModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'z'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
