import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { CompraCrearPage } from '../compra-crear/compra-crear.page';
import { Compra } from '../services/compra';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
  standalone: false
})
export class CompraPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private compraService: Compra

  ) { }

  compras: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarCompra();
    this.cargarTotal();

  }

  async cargarCompra() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.compraService.listado('?page=' + this.page + '&expand=medicamentoNombre', this.busqueda).subscribe(
        response => {
          this.compras = response;
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
      component: CompraCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCompra();
    });
  }

  async editar(comp_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: CompraCrearPage,
      componentProps: {
        'comp_id': comp_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCompra();
    });
  }

  async alertEliminar(comp_id: number, medicamentoNombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compra',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la compra de ' + medicamentoNombre + '?',
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
            this.eliminar(comp_id, medicamentoNombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(comp_id: number, medicamentoNombre: string) {
    try {
      await this.compraService.eliminar(comp_id, medicamentoNombre).subscribe(
        response => {
          this.alertEliminado(comp_id, 'La compra de' + medicamentoNombre + ' sido eliminada.');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(comp_id, 'La compra ha sido eliminada');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(comp_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(comp_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Compra',
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
    this.router.navigate(['/compra']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.compraService.total(this.busqueda).subscribe(
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
    this.cargarCompra();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarCompra();
  }

}
