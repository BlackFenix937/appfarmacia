import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Devolucion } from '../services/devolucion';
import { DevolucionCrearPage } from '../devolucion-crear/devolucion-crear.page';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.page.html',
  styleUrls: ['./devolucion.page.scss'],
  standalone: false
})
export class DevolucionPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private devolucionService: Devolucion,
  ) { }

  devoluciones: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarDevoluciones();
    this.cargarTotal();

  }

  async cargarDevoluciones() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.devolucionService.listado('?page=' + this.page + '&expand=medicamentoNombre,estadoDevolucion', this.busqueda).subscribe(
        response => {
          this.devoluciones = response;
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
      await this.devolucionService.total(this.busqueda).subscribe(
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
    this.cargarDevoluciones();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarDevoluciones();
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: DevolucionCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarDevoluciones();
    });
  }

  async alertEliminar(dev_id: number, medicamentoNombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Devolución',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la devolución de ' + medicamentoNombre + '?',
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
            this.eliminar(dev_id, medicamentoNombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(dev_id: number, medicamentoNombre: string) {
    try {
      await this.devolucionService.eliminar(dev_id, medicamentoNombre).subscribe(
        response => {
          this.alertEliminado(dev_id, 'La devolución por ' + medicamentoNombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(dev_id, 'La devolución ha sido eliminada');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(dev_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(dev_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Devolucion',
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
    this.router.navigate(['/devolucion']).then(() => {
      window.location.reload();
    });
  }

}
