import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteCrearPage } from './cliente-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteCrearPageRoutingModule {}
