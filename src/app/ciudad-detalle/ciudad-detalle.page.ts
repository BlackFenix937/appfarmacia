import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Ciudad } from '../services/ciudad';

@Component({
  selector: 'app-ciudad-detalle',
  templateUrl: './ciudad-detalle.page.html',  
  styleUrls: ['./ciudad-detalle.page.scss'],
  standalone:false
})
export class CiudadDetallePage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private loading: LoadingController,
  private CiudadService: Ciudad
  ) { }

  ciudad:any=null;

  ngOnInit():void {
    this.cargarCiudad();
  }

/*  async cargarCiudad() {
  const ciu_id = this.route.snapshot.paramMap.get('ciu_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/ciudads/"+ciu_id+"?expand=municipioNombre",
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.ciudad = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}*/

async cargarCiudad() {
    const ciu_id = this.route.snapshot.paramMap.get('ciu_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.CiudadService.detalle(ciu_id).subscribe(
        response => {
          this.ciudad = response;
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
