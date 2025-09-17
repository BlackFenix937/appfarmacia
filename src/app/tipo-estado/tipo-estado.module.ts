import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoEstadoPageRoutingModule } from './tipo-estado-routing.module';

import { TipoEstadoPage } from './tipo-estado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoEstadoPageRoutingModule
  ],
  declarations: [TipoEstadoPage]
})
export class TipoEstadoPageModule {}
