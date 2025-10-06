import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { PaisCrearPage } from '../pais-crear/pais-crear.page';


@Component({
  selector: 'app-pais',
  templateUrl: './pais.page.html',
  styleUrls: ['./pais.page.scss'],
  standalone:false
})
export class PaisPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
    
) {}

paises: any = [];

  ngOnInit() {
    this.cargarPaises(); 
}

async cargarPaises (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/pais",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.paises = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

async new() {
    const paginaModal = await this.modalCtrl.create({
        component: PaisCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
        initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarPaises();
    });
}

}
