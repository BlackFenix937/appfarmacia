import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadComercialPage } from './entidad-comercial.page';

const routes: Routes = [
  {
    path: '',
    component: EntidadComercialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntidadComercialPageRoutingModule {}
