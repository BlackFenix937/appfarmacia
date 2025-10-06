import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoCrearPage } from './estado-crear.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoCrearPageRoutingModule {}
