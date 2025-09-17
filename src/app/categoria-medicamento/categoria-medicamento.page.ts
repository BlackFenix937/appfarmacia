import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-categoria-medicamento',
  templateUrl: './categoria-medicamento.page.html',
  styleUrls: ['./categoria-medicamento.page.scss'],
  standalone:false
})
export class CategoriaMedicamentoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  categoriamedicamentos:any=[];

  ngOnInit() {
    this.cargarCategoriaMedicamento();
  }

  async cargarCategoriaMedicamento (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/categoriamedicamentos",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.categoriamedicamentos = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
