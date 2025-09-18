import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadMedicamentoDetallePage } from './entidad-medicamento-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: EntidadMedicamentoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntidadMedicamentoDetallePageRoutingModule {}
