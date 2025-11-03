import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadMedicamentoCrearPage } from './entidad-medicamento-crear.page';

const routes: Routes = [
  {
    path: '',
    component: EntidadMedicamentoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntidadMedicamentoCrearPageRoutingModule {}
