import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Pago } from '../services/pago';
import { PagoCrearPage } from '../pago-crear/pago-crear.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
  standalone: false
})
export class PagoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCtrl: AlertController,


    private pagoService: Pago

  ) { }
  pagos: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarPagos();
    this.cargarTotal();
  }

  async cargarPagos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.pagoService.listado('?page=' + this.page+"&expand=medicamentosComprados", this.busqueda).subscribe(
        response => {
          this.pagos = response;
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
      component: PagoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarPagos();
    });
  }

  async alertEliminar(pag_id: number, medicamentosComprados: string) {
    const alert = await this.alertCtrl.create({
      header: 'Pago',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el pago de ' + medicamentosComprados + '?',
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
            this.eliminar(pag_id, medicamentosComprados);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(pag_id: number, medicamentosComprados: string) {
    try {
      await this.pagoService.eliminar(pag_id, medicamentosComprados).subscribe(
        response => {
          this.alertEliminado(pag_id, 'El pago de ' + medicamentosComprados + ' sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(pag_id, 'El pago ha sido eliminado');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(pag_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(pag_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Pago',
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
    this.router.navigate(['/pago']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.pagoService.total(this.busqueda).subscribe(
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
    this.cargarPagos();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarPagos();
  }

}
