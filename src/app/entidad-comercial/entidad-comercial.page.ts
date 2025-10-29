import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EntidadComercialCrearPage } from '../entidad-comercial-crear/entidad-comercial-crear.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entidad-comercial',
  templateUrl: './entidad-comercial.page.html',
  styleUrls: ['./entidad-comercial.page.scss'],
  standalone:false
})
export class EntidadComercialPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  baseUrl: string='http://localhost:8080/entidadcomercials';
  entidadcomerciales:any=[];

  ngOnInit() {
    this.cargarEntidadComerciales();
  }

  async cargarEntidadComerciales (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/entidadcomercials",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.entidadcomerciales = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

async new() {
    const paginaModal = await this.modalCtrl.create({
        component: EntidadComercialCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
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

async alertEliminar(ent_id: number, ent_nombre:string) {
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

async eliminar(ent_id: number, ent_nombre:string) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + ent_id,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(ent_id, 'La entidad comercial ' +ent_nombre+ ' ha sido eliminada.');
      }
    }).catch((error)=> {
      if (error?.response.status == 500) {
        this.alertEliminado(ent_id, 'La entidad comercial ' +ent_nombre+ ' no se puede eliminar porque esta asociada');
      }
      console.log(error);
    });
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

}
