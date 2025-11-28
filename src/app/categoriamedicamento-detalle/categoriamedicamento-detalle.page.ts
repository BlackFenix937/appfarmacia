import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Categoriamedicamento } from '../services/categoriamedicamento';

@Component({
  selector: 'app-categoriamedicamento-detalle',
  templateUrl: './categoriamedicamento-detalle.page.html',
  styleUrls: ['./categoriamedicamento-detalle.page.scss'],
  standalone:false
})
export class CategoriamedicamentoDetallePage implements OnInit {

  constructor(
    private loading: LoadingController,
    private route: ActivatedRoute,
    private location: Location,
    private catmedService: Categoriamedicamento,        
  ) { }

  categoriamedicamento: any = null;

  ngOnInit():void {
    this.cargarCategoriaMedicamento();
  }

    async cargarCategoriaMedicamento() {
    const catmed_id = this.route.snapshot.paramMap.get('catmed_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.catmedService.detalle(catmed_id, '?expand=medicamentoNombre').subscribe(
        response => {
          this.categoriamedicamento = response;
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
