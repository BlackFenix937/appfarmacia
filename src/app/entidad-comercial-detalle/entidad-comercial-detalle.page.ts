import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { EntidadComercial } from '../services/entidad-comercial';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entidad-comercial-detalle',
  templateUrl: './entidad-comercial-detalle.page.html',
  styleUrls: ['./entidad-comercial-detalle.page.scss'],
  standalone: false
})
export class EntidadComercialDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private EntidadComercialService: EntidadComercial,
    private location: Location
  ) { }

  entidadcomercial: any = null;

  ngOnInit(): void {
    this.cargarEntidadComercial();
  }

  async cargarEntidadComercial() {
    const med_id = this.route.snapshot.paramMap.get('ent_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.EntidadComercialService.detalle(med_id).subscribe(
        response => {
          this.entidadcomercial = response;
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
