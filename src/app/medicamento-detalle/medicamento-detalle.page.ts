import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-medicamento-detalle',
  templateUrl: './medicamento-detalle.page.html',
  styleUrls: ['./medicamento-detalle.page.scss'],
  standalone:false,
})
export class MedicamentoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  medicamento:any=null;

  ngOnInit():void {
    this.cargarMedicamento();
  }

  async cargarMedicamento() {
  const med_id = this.route.snapshot.paramMap.get('med_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/medicamentos/"+med_id,
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.medicamento = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}

}
