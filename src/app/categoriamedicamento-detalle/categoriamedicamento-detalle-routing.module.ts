import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriamedicamentoDetallePage } from './categoriamedicamento-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriamedicamentoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriamedicamentoDetallePageRoutingModule {}
