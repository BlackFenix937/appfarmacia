import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevolucionCrearPageRoutingModule } from './devolucion-crear-routing.module';

import { DevolucionCrearPage } from './devolucion-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevolucionCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DevolucionCrearPage]
})
export class DevolucionCrearPageModule {}
