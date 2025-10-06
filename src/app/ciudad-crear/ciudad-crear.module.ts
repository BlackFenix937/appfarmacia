import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CiudadCrearPageRoutingModule } from './ciudad-crear-routing.module';

import { CiudadCrearPage } from './ciudad-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CiudadCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CiudadCrearPage]
})
export class CiudadCrearPageModule {}
