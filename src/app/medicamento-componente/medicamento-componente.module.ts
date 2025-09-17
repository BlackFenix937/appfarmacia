import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentoComponentePageRoutingModule } from './medicamento-componente-routing.module';

import { MedicamentoComponentePage } from './medicamento-componente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentoComponentePageRoutingModule
  ],
  declarations: [MedicamentoComponentePage]
})
export class MedicamentoComponentePageModule {}
