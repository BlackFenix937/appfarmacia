import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraDetallePage } from './compra-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CompraDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraDetallePageRoutingModule {}
