import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { CiudadCrearPage } from '../ciudad-crear/ciudad-crear.page';
import { Router } from '@angular/router';
import { Ciudad } from '../services/ciudad';
import { permisoGuard } from '../guard/permiso-guard';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.page.html',
  styleUrls: ['./ciudad.page.scss'],
  standalone: false

})
export class CiudadPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private CiudadService: Ciudad,
  ) { }

  ciudades: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';


  ngOnInit() {
    this.cargarCiudades();
    this.cargarTotal();
  }

  async cargarCiudades() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.CiudadService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.ciudades = response;
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
      component: CiudadCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCiudades();

    });
  }

  async editar(ciu_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: CiudadCrearPage,
      componentProps: {
        'ciu_id': ciu_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCiudades();
    });
  }

  async alertEliminar(ciu_id: number, ciu_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Ciudad',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la ciudad ' + ciu_nombre + '?',
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
            this.eliminar(ciu_id, ciu_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(ciu_id: number, ciu_nombre: string) {
    try {
      await this.CiudadService.eliminar(ciu_id, ciu_nombre).subscribe(
        response => {
          this.alertEliminado(ciu_id, 'La ciudad ' + ciu_nombre + ' sido eliminada');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(ciu_id, 'La ciudad ha sido eliminada');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(ciu_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(ciu_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Ciudad',
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
    this.router.navigate(['/ciudad']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.CiudadService.total(this.busqueda).subscribe(
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
    this.cargarCiudades();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarCiudades();
  }

}
