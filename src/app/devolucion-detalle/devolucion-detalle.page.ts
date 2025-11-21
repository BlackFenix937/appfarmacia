import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Devolucion } from '../services/devolucion';

@Component({
  selector: 'app-devolucion-detalle',
  templateUrl: './devolucion-detalle.page.html',
  styleUrls: ['./devolucion-detalle.page.scss'],
  standalone: false
})
export class DevolucionDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private location: Location,
    private devolucionService: Devolucion
  ) { }

  devolucion: any = null;

  ngOnInit(): void {
    this.cargarDevolucion();

  }

  /*  async cargarDevolucion() {
    const dev_id = this.route.snapshot.paramMap.get('dev_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/devolucions/"+dev_id+"?expand=medicamentoNombre,estadoDevolucion",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.devolucion = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }*/

  async cargarDevolucion() {
    const dev_id = this.route.snapshot.paramMap.get('dev_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.devolucionService.detalle(dev_id, '?expand=medicamentoNombre,estadoDevolucion').subscribe(
        response => {
          this.devolucion = response;
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

  goBack() {
    this.location.back();
  }

}
