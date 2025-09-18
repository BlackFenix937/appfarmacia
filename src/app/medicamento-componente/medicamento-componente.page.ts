import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-medicamento-componente',
  templateUrl: './medicamento-componente.page.html',
  styleUrls: ['./medicamento-componente.page.scss'],
  standalone: false
})
export class MedicamentoComponentePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  medicamentocomponentes:any=[];

  ngOnInit() {
    this.cargarMedicamentoComponentes();
  }

  async cargarMedicamentoComponentes (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/medicamentocomponentes?expand=medicamentoNombre, componenteNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.medicamentocomponentes = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}
}
