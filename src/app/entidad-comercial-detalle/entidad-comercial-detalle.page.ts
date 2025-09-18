import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-entidad-comercial-detalle',
  templateUrl: './entidad-comercial-detalle.page.html',
  styleUrls: ['./entidad-comercial-detalle.page.scss'],
  standalone:false
})
export class EntidadComercialDetallePage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private loading: LoadingController
  ) { }

  entidadcomercial:any=null;

  ngOnInit(): void {
    this.cargarEntidadComercial();
  }

  async cargarEntidadComercial() {
  const ent_id = this.route.snapshot.paramMap.get('ent_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/entidadcomercials/"+ent_id,
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.entidadcomercial = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}

}
