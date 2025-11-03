import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadMedicamentoPageRoutingModule } from './entidad-medicamento-routing.module';

import { EntidadMedicamentoPage } from './entidad-medicamento.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadMedicamentoPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [EntidadMedicamentoPage]
})
export class EntidadMedicamentoPageModule {}
