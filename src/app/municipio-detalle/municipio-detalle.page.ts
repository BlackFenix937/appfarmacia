import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Municipio } from '../services/municipio';
import { Location } from '@angular/common';

@Component({
  selector: 'app-municipio-detalle',
  templateUrl: './municipio-detalle.page.html',
  styleUrls: ['./municipio-detalle.page.scss'],
  standalone: false,
})
export class MunicipioDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private MunicipioService: Municipio,
    private location: Location

  ) { }

  municipio: any = false;

  ngOnInit(): void {
    this.cargarMunicipio();
  }

  async cargarMunicipio() {
    const mun_id = this.route.snapshot.paramMap.get('mun_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.MunicipioService.detalle(mun_id).subscribe(
        response => {
          this.municipio = response;
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
