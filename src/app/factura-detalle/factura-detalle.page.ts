import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.page.html',
  styleUrls: ['./factura-detalle.page.scss'],
  standalone:false
})
export class FacturaDetallePage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private loading: LoadingController) { }

  factura:any=null;

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
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/facturas/"+fac_id+"?expand=estadoFactura, facturaSolicitada, medicamentosFacturados",
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.factura = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}

}
