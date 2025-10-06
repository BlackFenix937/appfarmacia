import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaisCrearPageRoutingModule } from './pais-crear-routing.module';

import { PaisCrearPage } from './pais-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PaisCrearPage]
})
export class PaisCrearPageModule {}
