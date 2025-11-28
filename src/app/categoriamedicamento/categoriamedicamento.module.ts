import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriamedicamentoPageRoutingModule } from './categoriamedicamento-routing.module';

import { CategoriamedicamentoPage } from './categoriamedicamento.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriamedicamentoPageRoutingModule,
    ToolbarModule,
    PaginacionModule,
  ],
  declarations: [CategoriamedicamentoPage]
})
export class CategoriamedicamentoPageModule {}
