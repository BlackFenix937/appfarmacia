import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CiudadPageRoutingModule } from './ciudad-routing.module';

import { CiudadPage } from './ciudad.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CiudadPageRoutingModule,
    ToolbarModule,
    PaginacionModule,
  ],
  declarations: [CiudadPage]
})
export class CiudadPageModule { }
