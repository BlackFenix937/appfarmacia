import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-entidad-comercial',
  templateUrl: './entidad-comercial.page.html',
  styleUrls: ['./entidad-comercial.page.scss'],
  standalone:false
})
export class EntidadComercialPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  entidadcomerciales:any=[];

  ngOnInit() {
    this.cargarEntidadComerciales();
  }

  async cargarEntidadComerciales (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/entidadcomercials",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.entidadcomerciales = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
