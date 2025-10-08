import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { ClienteCrearPage } from '../cliente-crear/cliente-crear.page';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone:false
})
export class ClientePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) { }

  clientes:any=[];

  ngOnInit() {
    this.cargarClientes();
  }

  async cargarClientes (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/clientes?expand=ciudadNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.clientes = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

async new() {
    const paginaModal = await this.modalCtrl.create({
        component: ClienteCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
        initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarClientes();
    });
}


}
