import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-ciudad-detalle',
  templateUrl: './ciudad-detalle.page.html',  
  styleUrls: ['./ciudad-detalle.page.scss'],
  standalone:false
})
export class CiudadDetallePage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private loading: LoadingController
  ) { }

  ciudad:any=null;

  ngOnInit():void {
    this.cargarCiudad();
  }

  async cargarCiudad() {
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
}

}
