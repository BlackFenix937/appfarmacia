import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Estado } from '../services/estado';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estado-detalle',
  templateUrl: './estado-detalle.page.html',
  styleUrls: ['./estado-detalle.page.scss'],
  standalone: false,
})
export class EstadoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private EstadosServices: Estado,
    private location: Location

  ) { }

  estado: any = false;

  ngOnInit(): void {
    this.cargarEstado();
  }

  async cargarEstado() {
    const estd_id = this.route.snapshot.paramMap.get('estd_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.EstadosServices.detalle(estd_id).subscribe(
        response => {
          this.estado = response;
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
