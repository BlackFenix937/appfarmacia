import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaMedicamentoPageRoutingModule } from './categoria-medicamento-routing.module';

import { CategoriaMedicamentoPage } from './categoria-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaMedicamentoPageRoutingModule
  ],
  declarations: [CategoriaMedicamentoPage]
})
export class CategoriaMedicamentoPageModule {}
