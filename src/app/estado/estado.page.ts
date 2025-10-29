import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EstadoCrearPage } from '../estado-crear/estado-crear.page';
import { Router } from '@angular/router';

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

  ) { }

  baseUrl: string='http://localhost:8080/estados';
  estados: any=[];

  ngOnInit() {
    this.cargarEstados();
  }

   async cargarEstados (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/estados?expand=paisNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.estados = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

async new() {
    const paginaModal = await this.modalCtrl.create({
        component: EstadoCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
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

async alertEliminar(estd_id: number, estd_nombre:string) {
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

async eliminar(estd_id: number, estd_nombre:string) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + estd_id,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(estd_id, 'El estado ' +estd_nombre+ ' ha sido eliminado.');
      }
    }).catch((error)=> {
      if (error?.response.status == 500) {
        this.alertEliminado(estd_id, 'El estado ' +estd_nombre+ ' no se puede eliminar porque esta asociado.');
      }
      console.log(error);
    });
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

}
