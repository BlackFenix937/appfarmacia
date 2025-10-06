import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipioDetallePage } from './municipio-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MunicipioDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipioDetallePageRoutingModule {}
