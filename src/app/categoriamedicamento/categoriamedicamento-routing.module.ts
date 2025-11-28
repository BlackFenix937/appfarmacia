import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriamedicamentoPage } from './categoriamedicamento.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriamedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriamedicamentoPageRoutingModule {}
