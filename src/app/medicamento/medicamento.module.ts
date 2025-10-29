import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentoPageRoutingModule } from './medicamento-routing.module';

import { MedicamentoPage } from './medicamento.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentoPageRoutingModule,
    ToolbarModule,
    PaginacionModule,
  ],
  declarations: [MedicamentoPage]
})
export class MedicamentoPageModule {}
