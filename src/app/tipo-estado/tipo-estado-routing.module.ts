import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoEstadoPage } from './tipo-estado.page';

const routes: Routes = [
  {
    path: '',
    component: TipoEstadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoEstadoPageRoutingModule {}
