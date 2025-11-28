import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponenteCrearPage } from './componente-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ComponenteCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponenteCrearPageRoutingModule {}
