import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Medicamento } from '../services/medicamento';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicamento-detalle',
  templateUrl: './medicamento-detalle.page.html',
  styleUrls: ['./medicamento-detalle.page.scss'],
  standalone: false,
})
export class MedicamentoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private medicamentosService: Medicamento,
    private location: Location
  ) { }

  medicamento: any = null;

  ngOnInit(): void {
    this.cargarMedicamento();
  }

  async cargarMedicamento() {
    const med_id = this.route.snapshot.paramMap.get('med_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.medicamentosService.detalle(med_id).subscribe(
        response => {
          this.medicamento = response;
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
