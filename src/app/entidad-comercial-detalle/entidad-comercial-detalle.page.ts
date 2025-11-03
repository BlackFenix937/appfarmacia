import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { EntidadComercial } from '../services/entidad-comercial';

@Component({
  selector: 'app-entidad-comercial-detalle',
  templateUrl: './entidad-comercial-detalle.page.html',
  styleUrls: ['./entidad-comercial-detalle.page.scss'],
  standalone:false
})
export class EntidadComercialDetallePage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private loading: LoadingController,
  private EntidadComercialService: EntidadComercial,
  ) { }

  entidadcomercial:any=null;

  ngOnInit(): void {
    this.cargarEntidadComercial();
  }

/*  async cargarEntidadComercial() {
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
}*/

async cargarEntidadComercial() {
    const med_id = this.route.snapshot.paramMap.get('ent_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.EntidadComercialService.detalle(med_id).subscribe(
        response => {
          this.entidadcomercial = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

}
