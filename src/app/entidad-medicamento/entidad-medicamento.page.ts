import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EntidadMedicamento } from '../services/entidad-medicamento';
import { EntidadMedicamentoCrearPage } from '../entidad-medicamento-crear/entidad-medicamento-crear.page';

@Component({
  selector: 'app-entidad-medicamento',
  templateUrl: './entidad-medicamento.page.html',
  styleUrls: ['./entidad-medicamento.page.scss'],
  standalone:false
})
export class EntidadMedicamentoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private EntidadMedicamentoService: EntidadMedicamento,
  ) { }

  baseUrl: string = "http://localhost:8080/entidadmedicamento";
  entidadmedicamentos:any=[];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarEntidadMedicamentos();
    this.cargarTotal();

  }

/*  async cargarEntidadMedicamentos (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/entidadmedicamentos?expand=nombreEntidad, estadoEntrega, medicamentoNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.entidadmedicamentos = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}*/

async cargarEntidadMedicamentos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.EntidadMedicamentoService.listado('?page='+this.page+"&expand=medicamentoNombre", this.busqueda).subscribe(
        response => {
          this.entidadmedicamentos = response;
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

async editar(entmed_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: EntidadMedicamentoCrearPage,
      componentProps: {
        'entmed_id': entmed_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEntidadMedicamentos();
    });
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: EntidadMedicamentoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEntidadMedicamentos();
    });
  }

  async alertEliminar(entmed_id: number, medicamentoNombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'EntidadMedicamento',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el registro ' + entmed_id + '?',
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
            this.eliminar(entmed_id, medicamentoNombre);
          }
        }
      ]
    });
    await alert.present();
  }

    async eliminar(entmed_id: number, medicamento_nombre: string) {
    try {
      await this.EntidadMedicamentoService.eliminar(entmed_id, medicamento_nombre).subscribe(
        response => {
          this.alertEliminado(entmed_id, 'El medicamento ' + medicamento_nombre + ' sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(entmed_id, 'El medicamento ha sido eliminado');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(entmed_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(med_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'EntidadMedicamento',
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
      await this.EntidadMedicamentoService.total(this.busqueda).subscribe(
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
    this.cargarEntidadMedicamentos();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarEntidadMedicamentos();
  }

}
