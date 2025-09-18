import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-entidad-medicamento',
  templateUrl: './entidad-medicamento.page.html',
  styleUrls: ['./entidad-medicamento.page.scss'],
  standalone:false
})
export class EntidadMedicamentoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  entidadmedicamentos:any=[];

  ngOnInit() {
    this.cargarEntidadMedicamentos();
  }

  async cargarEntidadMedicamentos (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/entidadmedicamentos?expand=nombreEntidad, estadoEntrega, medicamentoNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.entidadmedicamentos = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

}
