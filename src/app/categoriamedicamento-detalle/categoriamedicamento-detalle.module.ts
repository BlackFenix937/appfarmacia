import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriamedicamentoDetallePageRoutingModule } from './categoriamedicamento-detalle-routing.module';

import { CategoriamedicamentoDetallePage } from './categoriamedicamento-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriamedicamentoDetallePageRoutingModule
  ],
  declarations: [CategoriamedicamentoDetallePage]
})
export class CategoriamedicamentoDetallePageModule {}
