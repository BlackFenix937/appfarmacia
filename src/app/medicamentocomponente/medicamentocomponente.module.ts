import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentocomponentePageRoutingModule } from './medicamentocomponente-routing.module';

import { MedicamentocomponentePage } from './medicamentocomponente.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentocomponentePageRoutingModule,
    PaginacionModule,
    ToolbarModule
  ],
  declarations: [MedicamentocomponentePage]
})
export class MedicamentocomponentePageModule {}
