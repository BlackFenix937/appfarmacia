import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaCrearPage } from './factura-crear.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaCrearPageRoutingModule {}
