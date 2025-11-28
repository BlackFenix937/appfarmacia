import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriamedicamentoCrearPageRoutingModule } from './categoriamedicamento-crear-routing.module';

import { CategoriamedicamentoCrearPage } from './categoriamedicamento-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriamedicamentoCrearPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CategoriamedicamentoCrearPage]
})
export class CategoriamedicamentoCrearPageModule {}
