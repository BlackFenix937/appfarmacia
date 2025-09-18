import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CiudadDetallePage } from './ciudad-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CiudadDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CiudadDetallePageRoutingModule {}
