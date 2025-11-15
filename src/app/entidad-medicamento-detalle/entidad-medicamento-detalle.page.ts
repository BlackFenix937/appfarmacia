import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { EntidadMedicamento } from '../services/entidad-medicamento';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entidad-medicamento-detalle',
  templateUrl: './entidad-medicamento-detalle.page.html',
  styleUrls: ['./entidad-medicamento-detalle.page.scss'],
  standalone: false
})
export class EntidadMedicamentoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private EntidadMedicamentoService: EntidadMedicamento,
    private location: Location

  ) { }

  entidadmedicamento: any = null;

  ngOnInit(): void {
    this.cargarEntidadMedicamento();
  }

  async cargarEntidadMedicamento() {
    const entmed_id = this.route.snapshot.paramMap.get('entmed_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.EntidadMedicamentoService.detalle(entmed_id, '?expand=nombreEntidad, estadoEntrega, medicamentoNombre').subscribe(
        response => {
          this.entidadmedicamento = response;
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
