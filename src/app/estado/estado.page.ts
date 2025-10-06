import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EstadoCrearPage } from '../estado-crear/estado-crear.page';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.page.html',
  styleUrls: ['./estado.page.scss'],
  standalone: false
})
export class EstadoPage implements OnInit {

  constructor(
      private loadingCtrl: LoadingController,
      private modalCtrl: ModalController

  ) { }

  estados: any=[];

  ngOnInit() {
    this.cargarEstados();
  }

   async cargarEstados (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/estados?expand=paisNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.estados = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

async new() {
    const paginaModal = await this.modalCtrl.create({
        component: EstadoCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
        initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarEstados();
    });
}

}
