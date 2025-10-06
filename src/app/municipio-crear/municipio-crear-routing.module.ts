import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipioCrearPage } from './municipio-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MunicipioCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipioCrearPageRoutingModule {}
