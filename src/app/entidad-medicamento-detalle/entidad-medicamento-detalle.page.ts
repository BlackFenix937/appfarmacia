import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-entidad-medicamento-detalle',
  templateUrl: './entidad-medicamento-detalle.page.html',
  styleUrls: ['./entidad-medicamento-detalle.page.scss'],
  standalone:false
})
export class EntidadMedicamentoDetallePage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private loading: LoadingController
  ) { }

  entidadmedicamento:any=null;

  ngOnInit():void {
    this.cargarEntidadMedicamento();
  }

  async cargarEntidadMedicamento() {
  const entmed_id = this.route.snapshot.paramMap.get('entmed_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/entidadmedicamentos/"+entmed_id+"?expand=nombreEntidad, estadoEntrega, medicamentoNombre",
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.entidadmedicamento = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}

}
