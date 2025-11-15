import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { EntidadComercialCrearPage } from '../entidad-comercial-crear/entidad-comercial-crear.page';
import { Router } from '@angular/router';
import { EntidadComercial } from '../services/entidad-comercial';

@Component({
  selector: 'app-entidad-comercial',
  templateUrl: './entidad-comercial.page.html',
  styleUrls: ['./entidad-comercial.page.scss'],
  standalone: false
})
export class EntidadComercialPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private EntidadComercialService: EntidadComercial
  ) { }

  entidadcomerciales: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarEntidadComerciales();
    this.cargarTotal();
  }

  async cargarEntidadComerciales() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.EntidadComercialService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.entidadcomerciales = response;
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
      component: EntidadComercialCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEntidadComerciales();
    });
  }

  async editar(ent_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: EntidadComercialCrearPage,
      componentProps: {
        'ent_id': ent_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEntidadComerciales();
    });
  }

  async alertEliminar(ent_id: number, ent_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Entidad Comercial',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la entidad comercial ' + ent_nombre + '?',
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
            this.eliminar(ent_id, ent_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(ent_id: number, ent_nombre: string) {
    try {
      await this.EntidadComercialService.eliminar(ent_id, ent_nombre).subscribe(
        response => {
          this.alertEliminado(ent_id, 'La entidad comercial ' + ent_nombre + ' sido eliminada.');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(ent_id, 'La entidad comercial ha sido eliminada');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(ent_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(ent_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Entidad comercial',
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
    this.router.navigate(['/entidad-comercial']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.EntidadComercialService.total(this.busqueda).subscribe(
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
    this.cargarEntidadComerciales();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarEntidadComerciales();
  }

}
