import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipioPage } from './municipio.page';

const routes: Routes = [
  {
    path: '',
    component: MunicipioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipioPageRoutingModule {}
