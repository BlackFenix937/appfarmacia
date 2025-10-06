import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoDetallePageRoutingModule } from './estado-detalle-routing.module';

import { EstadoDetallePage } from './estado-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoDetallePageRoutingModule
  ],
  declarations: [EstadoDetallePage]
})
export class EstadoDetallePageModule {}
