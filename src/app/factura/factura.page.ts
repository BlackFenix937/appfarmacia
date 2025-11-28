import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Factura } from '../services/factura';
import { FacturaCrearPage } from '../factura-crear/factura-crear.page';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
  standalone: false
})
export class FacturaPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private facturaService: Factura
  ) { }

  facturas: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarFacturas();
    this.cargarTotal();
  }

  async cargarFacturas() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.facturaService.listado('?page=' + this.page+'&expand=medicamentosFacturados', this.busqueda).subscribe(
        response => {
          this.facturas = response;
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
      component: FacturaCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarFacturas();
    });
  }

  async cargarTotal() {
    try {
      await this.facturaService.total(this.busqueda).subscribe(
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
    this.cargarFacturas();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarFacturas();
  }

    async alertEliminar(fac_id: number, medicamentosFacturados: string) {
    const alert = await this.alertCtrl.create({
      header: 'Factura',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la factura de ' + medicamentosFacturados + '?',
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
            this.eliminar(fac_id, medicamentosFacturados);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(fac_id: number, medicamentosFacturados: string) {
    try {
      await this.facturaService.eliminar(fac_id, medicamentosFacturados).subscribe(
        response => {
          this.alertEliminado(fac_id, 'La factura de ' + medicamentosFacturados + ' sido eliminada.');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(fac_id, 'La factura ha sido eliminada');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(fac_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(fac_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Factura',
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
    this.router.navigate(['/factura']).then(() => {
      window.location.reload();
    });
  }

}
