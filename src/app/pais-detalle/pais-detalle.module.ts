import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaisDetallePageRoutingModule } from './pais-detalle-routing.module';

import { PaisDetallePage } from './pais-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisDetallePageRoutingModule
  ],
  declarations: [PaisDetallePage]
})
export class PaisDetallePageModule {}
