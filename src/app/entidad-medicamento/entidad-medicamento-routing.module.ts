import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadMedicamentoPage } from './entidad-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: EntidadMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntidadMedicamentoPageRoutingModule {}
