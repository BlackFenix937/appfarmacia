import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraCrearPage } from './compra-crear.page';

const routes: Routes = [
  {
    path: '',
    component: CompraCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraCrearPageRoutingModule {}
