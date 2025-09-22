import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.page.html',
  styleUrls: ['./cliente-detalle.page.scss'],
  standalone:false,
})
export class ClienteDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  cliente:any=null;

  ngOnInit(): void {
    this.cargarCliente();
  }

  async cargarCliente() {
  const cli_id = this.route.snapshot.paramMap.get('cli_id');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/clientes/"+cli_id+"?expand=ciudadNombre,municipioNombre, estadoNombre",
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.cliente = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}

}
