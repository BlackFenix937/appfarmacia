import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicamentocomponenteCrearPage } from './medicamentocomponente-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MedicamentocomponenteCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicamentocomponenteCrearPageRoutingModule {}
