import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadMedicamentoPageRoutingModule } from './entidad-medicamento-routing.module';

import { EntidadMedicamentoPage } from './entidad-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadMedicamentoPageRoutingModule
  ],
  declarations: [EntidadMedicamentoPage]
})
export class EntidadMedicamentoPageModule {}
