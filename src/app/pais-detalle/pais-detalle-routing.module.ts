import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaisDetallePage } from './pais-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PaisDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaisDetallePageRoutingModule {}
