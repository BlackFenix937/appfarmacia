import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaisPageRoutingModule } from './pais-routing.module';

import { PaisPage } from './pais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisPageRoutingModule
  ],
  declarations: [PaisPage]
})
export class PaisPageModule {}
