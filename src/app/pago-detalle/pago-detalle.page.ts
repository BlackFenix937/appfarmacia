import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Pago } from '../services/pago';

@Component({
  selector: 'app-pago-detalle',
  templateUrl: './pago-detalle.page.html',
  styleUrls: ['./pago-detalle.page.scss'],
  standalone:false
})
export class PagoDetallePage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private loading: LoadingController,
  private location: Location,
  private pagoService: Pago,

  ) { }

  pago:any=null;

  ngOnInit(): void {
    this.cargarPago();
  }

/*  async cargarPago() {
  const pag_id = this.route.snapshot.paramMap.get('pag_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/pagos/"+pag_id+"?expand=pagoEstado, facturaSolicitada, medicamentosComprados",
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.pago = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}*/

  async cargarPago() {
    const pag_id = this.route.snapshot.paramMap.get('pag_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.pagoService.detalle(pag_id, '?expand=pagoEstado, facturaSolicitada, medicamentosComprados').subscribe(
        response => {
          this.pago = response;
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
