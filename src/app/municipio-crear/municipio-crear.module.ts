import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MunicipioCrearPageRoutingModule } from './municipio-crear-routing.module';

import { MunicipioCrearPage } from './municipio-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MunicipioCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MunicipioCrearPage]
})
export class MunicipioCrearPageModule {}
