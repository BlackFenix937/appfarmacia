import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
  standalone: false
})
export class FacturaPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }
facturas:any=[];

  ngOnInit() {
    this.cargarFacturas();
  }
  async cargarFacturas (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/facturas?expand=estadoFactura, facturaSolicitada, medicamentosFacturados",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.facturas = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
