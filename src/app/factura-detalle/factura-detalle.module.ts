import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaDetallePageRoutingModule } from './factura-detalle-routing.module';

import { FacturaDetallePage } from './factura-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaDetallePageRoutingModule
  ],
  declarations: [FacturaDetallePage]
})
export class FacturaDetallePageModule {}
