import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevolucionDetallePageRoutingModule } from './devolucion-detalle-routing.module';

import { DevolucionDetallePage } from './devolucion-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevolucionDetallePageRoutingModule
  ],
  declarations: [DevolucionDetallePage]
})
export class DevolucionDetallePageModule {}
