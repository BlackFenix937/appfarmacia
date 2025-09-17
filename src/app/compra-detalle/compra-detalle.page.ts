import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-compra-detalle',
  templateUrl: './compra-detalle.page.html',
  styleUrls: ['./compra-detalle.page.scss'],
  standalone:false
})
export class CompraDetallePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  compradetalles:any=[];

  ngOnInit() {
    this.cargarCompraDetalle();
  }

  async cargarCompraDetalle (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/compradetalles",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.compradetalles = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
