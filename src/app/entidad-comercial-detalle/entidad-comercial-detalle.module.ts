import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadComercialDetallePageRoutingModule } from './entidad-comercial-detalle-routing.module';

import { EntidadComercialDetallePage } from './entidad-comercial-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadComercialDetallePageRoutingModule
  ],
  declarations: [EntidadComercialDetallePage]
})
export class EntidadComercialDetallePageModule {}
