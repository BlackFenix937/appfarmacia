import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.page.html',
  styleUrls: ['./municipio.page.scss'],
  standalone: false
})
export class MunicipioPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }
municipios: any=[]
  ngOnInit() {
        this.cargarMunicipios();
  }
  async cargarMunicipios (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/municipios?expand=estadoNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.municipios = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
