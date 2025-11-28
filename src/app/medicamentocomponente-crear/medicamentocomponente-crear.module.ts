import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentocomponenteCrearPageRoutingModule } from './medicamentocomponente-crear-routing.module';

import { MedicamentocomponenteCrearPage } from './medicamentocomponente-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentocomponenteCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MedicamentocomponenteCrearPage]
})
export class MedicamentocomponenteCrearPageModule {}
