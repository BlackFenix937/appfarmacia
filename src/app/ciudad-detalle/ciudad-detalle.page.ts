import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Ciudad } from '../services/ciudad';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ciudad-detalle',
  templateUrl: './ciudad-detalle.page.html',
  styleUrls: ['./ciudad-detalle.page.scss'],
  standalone: false
})
export class CiudadDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private CiudadService: Ciudad,
    private location: Location
  ) { }

  ciudad: any = null;

  ngOnInit(): void {
    this.cargarCiudad();
  }

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

  goBack() {
    this.location.back();
  }

}
