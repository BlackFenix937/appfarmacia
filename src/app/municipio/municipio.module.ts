import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MunicipioPageRoutingModule } from './municipio-routing.module';

import { MunicipioPage } from './municipio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MunicipioPageRoutingModule
  ],
  declarations: [MunicipioPage]
})
export class MunicipioPageModule {}
