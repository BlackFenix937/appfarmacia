import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadComercialPageRoutingModule } from './entidad-comercial-routing.module';

import { EntidadComercialPage } from './entidad-comercial.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadComercialPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [EntidadComercialPage]
})
export class EntidadComercialPageModule {}
