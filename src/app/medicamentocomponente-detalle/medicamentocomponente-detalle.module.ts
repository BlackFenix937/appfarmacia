import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentocomponenteDetallePageRoutingModule } from './medicamentocomponente-detalle-routing.module';

import { MedicamentocomponenteDetallePage } from './medicamentocomponente-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentocomponenteDetallePageRoutingModule
  ],
  declarations: [MedicamentocomponenteDetallePage]
})
export class MedicamentocomponenteDetallePageModule {}
