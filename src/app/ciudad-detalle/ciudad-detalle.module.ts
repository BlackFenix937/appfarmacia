import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CiudadDetallePageRoutingModule } from './ciudad-detalle-routing.module';

import { CiudadDetallePage } from './ciudad-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CiudadDetallePageRoutingModule
  ],
  declarations: [CiudadDetallePage]
})
export class CiudadDetallePageModule {}
