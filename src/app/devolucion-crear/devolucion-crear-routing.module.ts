import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolucionCrearPage } from './devolucion-crear.page';

const routes: Routes = [
  {
    path: '',
    component: DevolucionCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolucionCrearPageRoutingModule {}
