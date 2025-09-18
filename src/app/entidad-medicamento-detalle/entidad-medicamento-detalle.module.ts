import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadMedicamentoDetallePageRoutingModule } from './entidad-medicamento-detalle-routing.module';

import { EntidadMedicamentoDetallePage } from './entidad-medicamento-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadMedicamentoDetallePageRoutingModule
  ],
  declarations: [EntidadMedicamentoDetallePage]
})
export class EntidadMedicamentoDetallePageModule {}
