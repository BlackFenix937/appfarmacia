import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentocomponenteDetallePage } from './medicamentocomponente-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentocomponenteDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentocomponenteDetallePageRoutingModule {}
