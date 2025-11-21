import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Factura } from '../services/factura';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.page.html',
  styleUrls: ['./factura-detalle.page.scss'],
  standalone: false
})
export class FacturaDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private location: Location,
    private facturaService: Factura

  ) { }

  factura: any = null;

  ngOnInit(): void {
    this.cargarFactura();
  }

      async cargarFactura() {
    const fac_id = this.route.snapshot.paramMap.get('fac_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.facturaService.detalle(fac_id,"?expand=estadoFactura,facturaSolicitada,medicamentosFacturados").subscribe(
        response => {
          this.factura = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

  goBack() {
    this.location.back();
  }

}
