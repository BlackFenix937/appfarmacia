import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Devolucion } from '../services/devolucion';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.page.html',
  styleUrls: ['./devolucion.page.scss'],
  standalone: false
})
export class DevolucionPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private devolucionService: Devolucion,
  ) { }

  devoluciones: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarDevoluciones();
    this.cargarTotal();

  }

  /*  async cargarDevoluciones(event?: InfiniteScrollCustomEvent) {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
      });
      await loading.present();
      const response = await axios({
        method: 'get',
        url: "http://localhost:8080/devolucions?expand=medicamentoNombre,estadoDevolucion",
        withCredentials: true,
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => {
        this.devoluciones = response.data;
        event?.target.complete();
      }).catch(function (error) {
        console.log(error);
      });
      loading.dismiss();
    }*/


  async cargarDevoluciones() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.devolucionService.listado('?page=' + this.page + '&expand=medicamentoNombre,estadoDevolucion', this.busqueda).subscribe(
        response => {
          this.devoluciones = response;
          this.cargarTotal();
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

  async cargarTotal() {
    try {
      await this.devolucionService.total(this.busqueda).subscribe(
        response => {
          this.total = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarDevoluciones();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarDevoluciones();
  }

}
