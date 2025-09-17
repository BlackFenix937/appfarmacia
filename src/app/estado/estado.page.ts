import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.page.html',
  styleUrls: ['./estado.page.scss'],
  standalone: false
})
export class EstadoPage implements OnInit {

  constructor(
      private loadingCtrl: LoadingController,

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

}
