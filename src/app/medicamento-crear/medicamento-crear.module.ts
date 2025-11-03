import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentoCrearPageRoutingModule } from './medicamento-crear-routing.module';

import { MedicamentoCrearPage } from './medicamento-crear.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentoCrearPageRoutingModule,
    ReactiveFormsModule,
    ToolbarModule
  ],
  declarations: [MedicamentoCrearPage]
})
export class MedicamentoCrearPageModule {}
