import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentePage } from './componente.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentePageRoutingModule {}
