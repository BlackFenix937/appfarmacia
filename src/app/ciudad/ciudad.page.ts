import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { CiudadCrearPage } from '../ciudad-crear/ciudad-crear.page';
import { Router } from '@angular/router';
import { CiudadCrearPageModule } from '../ciudad-crear/ciudad-crear.module';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.page.html',
  styleUrls: ['./ciudad.page.scss'],
  standalone:false

})
export class CiudadPage implements OnInit {

  constructor(
      private loadingCtrl: LoadingController,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private router: Router,

  ) { }
baseUrl: string='http://localhost:8080/ciudads';
ciudades: any=[]
  

ngOnInit() {
    this.cargarCiudades();
  }

  async cargarCiudades (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/ciudads?expand=municipioNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.ciudades = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}

async new() {
    const paginaModal = await this.modalCtrl.create({
        component: CiudadCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
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

async alertEliminar(ciu_id: number, ciu_nombre:string) {
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

async eliminar(ciu_id: number, ciu_nombre:string) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + ciu_id,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(ciu_id, 'La ciudad ' +ciu_nombre+ ' ha sido eliminada.');
      }
    }).catch((error)=> {
      if (error?.response.status == 500) {
        this.alertEliminado(ciu_id, 'La ciudad ' +ciu_nombre+ ' no se puede eliminar porque esta asociada');
      }
      console.log(error);
    });
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

}
