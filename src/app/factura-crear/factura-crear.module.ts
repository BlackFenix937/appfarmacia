import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaCrearPageRoutingModule } from './factura-crear-routing.module';

import { FacturaCrearPage } from './factura-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaCrearPageRoutingModule
  ],
  declarations: [FacturaCrearPage]
})
export class FacturaCrearPageModule {}
