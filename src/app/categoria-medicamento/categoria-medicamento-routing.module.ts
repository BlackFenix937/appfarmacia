import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaMedicamentoPage } from './categoria-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaMedicamentoPageRoutingModule {}
