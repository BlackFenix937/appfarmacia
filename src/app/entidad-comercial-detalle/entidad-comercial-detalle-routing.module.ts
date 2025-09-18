import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadComercialDetallePage } from './entidad-comercial-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: EntidadComercialDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntidadComercialDetallePageRoutingModule {}
