import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentoCrearPage } from './medicamento-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentoCrearPageRoutingModule {}
