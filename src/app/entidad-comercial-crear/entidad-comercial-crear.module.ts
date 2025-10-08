import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadComercialCrearPageRoutingModule } from './entidad-comercial-crear-routing.module';

import { EntidadComercialCrearPage } from './entidad-comercial-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadComercialCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EntidadComercialCrearPage]
})
export class EntidadComercialCrearPageModule {}
