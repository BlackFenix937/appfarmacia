import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-municipio-detalle',
  templateUrl: './municipio-detalle.page.html',
  styleUrls: ['./municipio-detalle.page.scss'],
  standalone:false,
})
export class MunicipioDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  municipio:any=false;

  ngOnInit():void {
    this.cargarMunicipio();
  }

  async cargarMunicipio() {
  const mun_id = this.route.snapshot.paramMap.get('mun_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/municipios/"+mun_id+"?expand=estadoNombre",
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.municipio = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}

}
