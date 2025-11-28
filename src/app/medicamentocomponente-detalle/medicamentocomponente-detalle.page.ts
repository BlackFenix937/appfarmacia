import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Medicamentocomponente } from '../services/medicamentocomponente';

@Component({
  selector: 'app-medicamentocomponente-detalle',
  templateUrl: './medicamentocomponente-detalle.page.html',
  styleUrls: ['./medicamentocomponente-detalle.page.scss'],
  standalone: false,
})
export class MedicamentocomponenteDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private location: Location,
    private medicompService: Medicamentocomponente,
  ) { }

  medicamentocomponente:any=null;

  ngOnInit():void {
    this.cargarMedicamentoComponente();
  }

    async cargarMedicamentoComponente() {
    const medcomp_id = this.route.snapshot.paramMap.get('medcomp_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.medicompService.detalle(medcomp_id,'?expand=medicamentoNombre,componenteNombre').subscribe(
        response => {
          this.medicamentocomponente = response;
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
