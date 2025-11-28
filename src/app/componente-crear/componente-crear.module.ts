import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponenteCrearPageRoutingModule } from './componente-crear-routing.module';

import { ComponenteCrearPage } from './componente-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponenteCrearPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ComponenteCrearPage]
})
export class ComponenteCrearPageModule {}
