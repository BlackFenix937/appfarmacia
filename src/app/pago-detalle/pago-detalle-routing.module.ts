import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoDetallePage } from './pago-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PagoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoDetallePageRoutingModule {}
