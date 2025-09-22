import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolucionDetallePage } from './devolucion-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: DevolucionDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolucionDetallePageRoutingModule {}
