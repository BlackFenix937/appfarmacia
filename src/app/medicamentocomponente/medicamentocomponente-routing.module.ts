import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentocomponentePage } from './medicamentocomponente.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentocomponentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentocomponentePageRoutingModule {}
