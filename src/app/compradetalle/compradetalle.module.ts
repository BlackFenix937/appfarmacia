import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompradetallePageRoutingModule } from './compradetalle-routing.module';

import { CompradetallePage } from './compradetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompradetallePageRoutingModule
  ],
  declarations: [CompradetallePage]
})
export class CompradetallePageModule {}
