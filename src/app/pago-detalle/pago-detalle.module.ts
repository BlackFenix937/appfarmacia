import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoDetallePageRoutingModule } from './pago-detalle-routing.module';

import { PagoDetallePage } from './pago-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoDetallePageRoutingModule
  ],
  declarations: [PagoDetallePage]
})
export class PagoDetallePageModule {}
