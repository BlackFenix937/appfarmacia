import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Componente } from '../services/componente';
import { ComponenteCrearPage } from '../componente-crear/componente-crear.page';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.page.html',
  styleUrls: ['./componente.page.scss'],
  standalone: false
})
export class ComponentePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private componenteService: Componente
  ) { }

  componentes: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarComponentes();
    this.cargarTotal();
  }

  async cargarComponentes() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.componenteService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.componentes = response;
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

  async editar(comp_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: ComponenteCrearPage,
      componentProps: {
        'comp_id': comp_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarComponentes();
    });
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: ComponenteCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarComponentes();
    });
  }

  async alertEliminar(comp_id: number, comp_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Componente',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el componente ' + comp_nombre + '?',
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
            this.eliminar(comp_id, comp_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(comp_id: number, comp_nombre: string) {
    try {
      await this.componenteService.eliminar(comp_id, comp_nombre).subscribe(
        response => {
          this.alertEliminado(comp_id, 'El componente ' + comp_nombre + ' sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(comp_id, 'El componente ha sido eliminado');
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
      header: 'Componente',
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
    this.router.navigate(['/componente']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.componenteService.total(this.busqueda).subscribe(
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
    this.cargarComponentes();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarComponentes();
  }

}
