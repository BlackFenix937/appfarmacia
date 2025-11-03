import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MunicipioPageRoutingModule } from './municipio-routing.module';

import { MunicipioPage } from './municipio.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MunicipioPageRoutingModule,
    ToolbarModule,
    PaginacionModule,
  ],
  declarations: [MunicipioPage]
})
export class MunicipioPageModule { }
