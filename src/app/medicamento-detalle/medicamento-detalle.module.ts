import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentoDetallePageRoutingModule } from './medicamento-detalle-routing.module';

import { MedicamentoDetallePage } from './medicamento-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentoDetallePageRoutingModule
  ],
  declarations: [MedicamentoDetallePage]
})
export class MedicamentoDetallePageModule {}
