import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'app-pais',
  templateUrl: './pais.page.html',
  styleUrls: ['./pais.page.scss'],
  standalone:false
})
export class PaisPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
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

}
