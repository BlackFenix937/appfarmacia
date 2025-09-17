import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntidadComercialPageRoutingModule } from './entidad-comercial-routing.module';

import { EntidadComercialPage } from './entidad-comercial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntidadComercialPageRoutingModule
  ],
  declarations: [EntidadComercialPage]
})
export class EntidadComercialPageModule {}
