import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraCrearPageRoutingModule } from './compra-crear-routing.module';

import { CompraCrearPage } from './compra-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraCrearPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CompraCrearPage]
})
export class CompraCrearPageModule {}
