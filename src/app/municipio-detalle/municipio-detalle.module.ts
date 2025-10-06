import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MunicipioDetallePageRoutingModule } from './municipio-detalle-routing.module';

import { MunicipioDetallePage } from './municipio-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MunicipioDetallePageRoutingModule
  ],
  declarations: [MunicipioDetallePage]
})
export class MunicipioDetallePageModule {}
