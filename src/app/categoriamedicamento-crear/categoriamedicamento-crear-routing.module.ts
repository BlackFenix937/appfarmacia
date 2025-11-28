import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriamedicamentoCrearPage } from './categoriamedicamento-crear.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriamedicamentoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriamedicamentoCrearPageRoutingModule {}
