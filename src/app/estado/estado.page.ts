import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { EstadoCrearPage } from '../estado-crear/estado-crear.page';
import { Router } from '@angular/router';
import { Estado } from '../services/estado';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.page.html',
  styleUrls: ['./estado.page.scss'],
  standalone: false
})
export class EstadoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private EstadosService: Estado

  ) { }

  estados: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarEstados();
    this.cargarTotal();
  }


  async cargarEstados() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.EstadosService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.estados = response;
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

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: EstadoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEstados();
    });
  }

  async editar(estd_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: EstadoCrearPage,
      componentProps: {
        'estd_id': estd_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEstados();
    });
  }

  async alertEliminar(estd_id: number, estd_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Estado',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el estado ' + estd_nombre + '?',
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
            this.eliminar(estd_id, estd_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(estd_id: number, estd_nombre: string) {
    try {
      await this.EstadosService.eliminar(estd_id, estd_nombre).subscribe(
        response => {
          this.alertEliminado(estd_id, 'El estado ' + estd_nombre + ' sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(estd_id, 'El estado ha sido eliminado');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(estd_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(estd_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Estado',
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
    this.router.navigate(['/estado']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.EstadosService.total(this.busqueda).subscribe(
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
    this.cargarEstados();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarEstados();
  }

}
