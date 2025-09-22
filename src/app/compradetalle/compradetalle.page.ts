import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-compradetalle',
  templateUrl: './compradetalle.page.html',
  styleUrls: ['./compradetalle.page.scss'],
  standalone: false
})
export class CompradetallePage implements OnInit {

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
        url: "http://localhost:8080/compradetalles?expand=medicamentoNombre",
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
