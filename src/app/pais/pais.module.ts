import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaisPageRoutingModule } from './pais-routing.module';

import { PaisPage } from './pais.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisPageRoutingModule,
    ToolbarModule,
    PaginacionModule,
  ],
  declarations: [PaisPage]
})
export class PaisPageModule {}
