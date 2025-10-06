import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoDetallePage } from './estado-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoDetallePageRoutingModule {}
