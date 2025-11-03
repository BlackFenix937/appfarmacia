import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoCrearPage } from './pago-crear.page';

const routes: Routes = [
  {
    path: '',
    component: PagoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoCrearPageRoutingModule {}
