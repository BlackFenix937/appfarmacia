import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { ClienteCrearPage } from '../cliente-crear/cliente-crear.page';
import { Router } from '@angular/router';
import { Cliente } from '../services/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: false
})
export class ClientePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private clienteService: Cliente,
  ) { }

  clientes: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarClientes();
    this.cargarTotal();
  }

  async cargarClientes() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.clienteService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.clientes = response;
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

  async editar(cli_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: ClienteCrearPage,
      componentProps: {
        'cli_id': cli_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarClientes();
    });
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: ClienteCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarClientes();
    });
  }

  async alertEliminar(cli_id: number, cli_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Cliente',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar al cliente ' + cli_nombre + '?',
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
            this.eliminar(cli_id, cli_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(cli_id: number, cli_nombre: string) {
    try {
      await this.clienteService.eliminar(cli_id, cli_nombre).subscribe(
        response => {
          this.alertEliminado(cli_id, 'El cliente ' + cli_nombre + ' sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(cli_id, 'El cliente ha sido eliminado');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(cli_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(cli_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Cliente',
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
    this.router.navigate(['/cliente']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.clienteService.total(this.busqueda).subscribe(
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
    this.cargarClientes();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarClientes();
  }


}
