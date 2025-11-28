import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Categoriamedicamento } from '../services/categoriamedicamento';
import { CategoriamedicamentoCrearPage } from '../categoriamedicamento-crear/categoriamedicamento-crear.page';

@Component({
  selector: 'app-categoriamedicamento',
  templateUrl: './categoriamedicamento.page.html',
  styleUrls: ['./categoriamedicamento.page.scss'],
  standalone: false
})
export class CategoriamedicamentoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private catmedService: Categoriamedicamento,
  ) { }

  categoriamedicamentos: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarCategoriaMedicamento();
    this.cargarTotal();
  }

  async cargarCategoriaMedicamento() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.catmedService.listado('?page=' + this.page + "&expand=medicamentoNombre", this.busqueda).subscribe(
        response => {
          this.categoriamedicamentos = response;
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
      component: CategoriamedicamentoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCategoriaMedicamento();

    });
  }

  async editar(catmed_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: CategoriamedicamentoCrearPage,
      componentProps: {
        'catmed_id': catmed_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCategoriaMedicamento();
    });
  }

  async alertEliminar(catmed_id: number, catmed_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Categoria Medicamento',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la categoria "' + catmed_nombre + '"?',
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
            this.eliminar(catmed_id, catmed_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(catmed_id: number, catmed_nombre: string) {
    try {
      await this.catmedService.eliminar(catmed_id, catmed_nombre).subscribe(
        response => {
          this.alertEliminado(catmed_id, 'La categoria "' + catmed_nombre + '" sido eliminada');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(catmed_id, 'La categoria ha sido eliminada');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(catmed_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(catmed_id: number, msg = "") {
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
    this.router.navigate(['/categoriamedicamento']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.catmedService.total(this.busqueda).subscribe(
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
    this.cargarCategoriaMedicamento();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarCategoriaMedicamento();
  }

}
