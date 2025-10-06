import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaisCrearPage } from './pais-crear.page';

const routes: Routes = [
  {
    path: '',
    component: PaisCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaisCrearPageRoutingModule {}
