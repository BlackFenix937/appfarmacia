import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoCrearPageRoutingModule } from './pago-crear-routing.module';

import { PagoCrearPage } from './pago-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoCrearPageRoutingModule
  ],
  declarations: [PagoCrearPage]
})
export class PagoCrearPageModule {}
