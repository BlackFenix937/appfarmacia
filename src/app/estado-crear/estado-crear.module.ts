import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoCrearPageRoutingModule } from './estado-crear-routing.module';

import { EstadoCrearPage } from './estado-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoCrearPageRoutingModule
  ],
  declarations: [EstadoCrearPage]
})
export class EstadoCrearPageModule {}
