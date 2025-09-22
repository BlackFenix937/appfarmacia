import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentoDetallePage } from './medicamento-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentoDetallePageRoutingModule {}
