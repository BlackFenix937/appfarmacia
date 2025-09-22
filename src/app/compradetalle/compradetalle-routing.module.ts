import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompradetallePage } from './compradetalle.page';

const routes: Routes = [
  {
    path: '',
    component: CompradetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompradetallePageRoutingModule {}
