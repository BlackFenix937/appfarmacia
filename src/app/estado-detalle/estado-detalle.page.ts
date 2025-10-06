import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-estado-detalle',
  templateUrl: './estado-detalle.page.html',
  styleUrls: ['./estado-detalle.page.scss'],
  standalone:false,
})
export class EstadoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  estado:any=false;

  ngOnInit():void {
    this.cargarEstado();
  }

  async cargarEstado() {
  const estd_id = this.route.snapshot.paramMap.get('estd_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/estados/"+estd_id+"?expand=paisNombre",
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.estado = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}

}
