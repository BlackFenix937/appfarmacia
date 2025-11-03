import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { MedicamentoCrearPage } from '../medicamento-crear/medicamento-crear.page';
import { Router } from '@angular/router';
import { Medicamento } from '../services/medicamento';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.page.html',
  styleUrls: ['./medicamento.page.scss'],
  standalone: false
})
export class MedicamentoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private medicamentosService: Medicamento,

  ) { }

  baseUrl: string = "http://localhost:8080/medicamento";
  medicamentos: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarMedicamentos();
    this.cargarTotal();

  }
/*
  async cargarMedicamentos(event?: InfiniteScrollCustomEvent) {

    let url: string = this.baseUrl + "/buscar";
    if (this.busqueda !== '') {
      url = this.baseUrl + "s/buscar/" + this.busqueda;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: url + "?page=" + this.page,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.medicamentos = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }*/
    async cargarMedicamentos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.medicamentosService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.medicamentos = response;
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

  async editar(med_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: MedicamentoCrearPage,
      componentProps: {
        'med_id': med_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarMedicamentos();
    });
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: MedicamentoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarMedicamentos();
    });
  }

  async alertEliminar(med_id: number, med_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Medicamento',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el medicamento ' + med_nombre + '?',
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
            this.eliminar(med_id, med_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  /*async eliminar(med_id: number, med_nombre: string) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + 's/' + med_id,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(med_id, 'El medicamento ' + med_nombre + ' ha sido eliminado');
      }
    }).catch((error) => {
      if (error?.response.status == 500) {
        this.alertEliminado(med_id, 'El medicamento ' + med_nombre + ' no se puede eliminar pq hay una relación');
      }
      console.log(error);
    });
  }*/

  async eliminar(med_id: number, med_nombre: string) {
    try {
      await this.medicamentosService.eliminar(med_id, med_nombre).subscribe(
        response => {
          this.alertEliminado(med_id, 'El cliente ' + med_nombre + ' sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(med_id, 'El cliente ha sido eliminado');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(med_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(med_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Medicamento',
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
    this.router.navigate(['/medicamento']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.medicamentosService.total(this.busqueda).subscribe(
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
    this.cargarMedicamentos();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarMedicamentos();
  }


}
