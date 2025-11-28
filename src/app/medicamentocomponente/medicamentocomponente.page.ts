import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Medicamentocomponente } from '../services/medicamentocomponente';
import { MedicamentocomponenteCrearPage } from '../medicamentocomponente-crear/medicamentocomponente-crear.page';

@Component({
  selector: 'app-medicamentocomponente',
  templateUrl: './medicamentocomponente.page.html',
  styleUrls: ['./medicamentocomponente.page.scss'],
  standalone: false,
})
export class MedicamentocomponentePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private medicompService: Medicamentocomponente,
  ) { }

  medicamentocomponentes: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarMedicamentoComponente();
    this.cargarTotal();
  }

  async cargarMedicamentoComponente() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.medicompService.listado('?page=' + this.page + '&expand=medicamentoNombre,componenteNombre', this.busqueda).subscribe(
        response => {
          this.medicamentocomponentes = response;
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
      await this.medicompService.total(this.busqueda).subscribe(
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
    this.cargarMedicamentoComponente();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarMedicamentoComponente();
  }

  async alertEliminar(medcomp_id: number, medicamentoNombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Medicamento Componente',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el componente del medicamento ' + medicamentoNombre + '?',
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.eliminar(medcomp_id, medicamentoNombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: MedicamentocomponenteCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarMedicamentoComponente();
    });
  }

  async editar(medcomp_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: MedicamentocomponenteCrearPage,
      componentProps: {
        'medcomp_id': medcomp_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarMedicamentoComponente();
    });
  }

  async eliminar(medcomp_id: number, medicamentoNombre: string) {
    try {
      await this.medicompService.eliminar(medcomp_id, medicamentoNombre).subscribe(
        response => {
          this.alertEliminado(medcomp_id, 'El componente del medicamento ' + medicamentoNombre + ' sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(medcomp_id, 'El componente del medicamento ha sido eliminado');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(medcomp_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(medcomp_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Medicamento Componente',
      subHeader: msg.includes('no se puede eliminar') ? 'Error al eliminar' : 'Eliminado',
      message: msg,
      cssClass: 'alert-center',
      buttons: [

        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
  }

  private regresar() {
    this.router.navigate(['/medicamentocomponente']).then(() => {
      window.location.reload();
    });
  }

}
