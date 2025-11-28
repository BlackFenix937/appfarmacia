import { Component, OnInit } from '@angular/core';
import {LoadingController } from '@ionic/angular';
import { Tipoestado } from '../services/tipoestado';

@Component({
  selector: 'app-tipo-estado',
  templateUrl: './tipo-estado.page.html',
  styleUrls: ['./tipo-estado.page.scss'],
  standalone: false
})
export class TipoEstadoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private tipoestadoService: Tipoestado,
  ) { }

  tipoEstados: any = [];

  ngOnInit() {
    this.cargarTipoestados();
  }

  async cargarTipoestados() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.tipoestadoService.listado().subscribe(
        response => {
          this.tipoEstados = response;
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
