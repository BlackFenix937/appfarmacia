import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadComercialCrearPage } from './entidad-comercial-crear.page';

const routes: Routes = [
  {
    path: '',
    component: EntidadComercialCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntidadComercialCrearPageRoutingModule {}
