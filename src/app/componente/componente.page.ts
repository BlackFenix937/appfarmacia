import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.page.html',
  styleUrls: ['./componente.page.scss'],
  standalone:false
})
export class ComponentePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  componentes:any=[];

  ngOnInit() {
    this.cargarComponentes();
  }

  async cargarComponentes (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/componentes",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.componentes = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
