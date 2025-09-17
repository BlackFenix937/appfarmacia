import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentePageRoutingModule } from './componente-routing.module';

import { ComponentePage } from './componente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentePageRoutingModule
  ],
  declarations: [ComponentePage]
})
export class ComponentePageModule {}
