import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EntidadComercialCrearPage } from '../entidad-comercial-crear/entidad-comercial-crear.page';

@Component({
  selector: 'app-entidad-comercial',
  templateUrl: './entidad-comercial.page.html',
  styleUrls: ['./entidad-comercial.page.scss'],
  standalone:false
})
export class EntidadComercialPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
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

async new() {
    const paginaModal = await this.modalCtrl.create({
        component: EntidadComercialCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
        initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarEntidadComerciales();
    });
}

}
