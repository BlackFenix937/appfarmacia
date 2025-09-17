import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraDetallePageRoutingModule } from './compra-detalle-routing.module';

import { CompraDetallePage } from './compra-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraDetallePageRoutingModule
  ],
  declarations: [CompraDetallePage]
})
export class CompraDetallePageModule {}
