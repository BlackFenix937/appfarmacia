import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraCrearPageRoutingModule } from './compra-crear-routing.module';

import { CompraCrearPage } from './compra-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraCrearPageRoutingModule
  ],
  declarations: [CompraCrearPage]
})
export class CompraCrearPageModule {}
