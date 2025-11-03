import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadMedicamentoCrearPageRoutingModule } from './entidad-medicamento-crear-routing.module';

import { EntidadMedicamentoCrearPage } from './entidad-medicamento-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadMedicamentoCrearPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [EntidadMedicamentoCrearPage]
})
export class EntidadMedicamentoCrearPageModule {}
