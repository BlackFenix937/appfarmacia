import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { MunicipioCrearPage } from '../municipio-crear/municipio-crear.page';
import { Router } from '@angular/router';
import { Municipio } from '../services/municipio';

@Component({
    selector: 'app-municipio',
    templateUrl: './municipio.page.html',
    styleUrls: ['./municipio.page.scss'],
    standalone: false
})
export class MunicipioPage implements OnInit {

    constructor(
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private router: Router,
        private MunicipioService: Municipio,
    ) { }

    municipios: any = [];
    total: number = 0;
    page: string = "1";
    busqueda: string = '';

    ngOnInit() {
        this.cargarMunicipios();
        this.cargarTotal();
    }

    async cargarMunicipios() {
        const loading = await this.loadingCtrl.create({
            message: 'Cargando',
            spinner: 'bubbles',
        });
        await loading.present();
        try {
            await this.MunicipioService.listado('?page=' + this.page, this.busqueda).subscribe(
                response => {
                    this.municipios = response;
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
            component: MunicipioCrearPage,
            breakpoints: [0, 0.3, 0.5, 0.95],
            initialBreakpoint: 0.95
        });
        await paginaModal.present();
        paginaModal.onDidDismiss().then((data) => {
            this.cargarMunicipios();
        });
    }

    async editar(mun_id: number) {
        const paginaModal = await this.modalCtrl.create({
            component: MunicipioCrearPage,
            componentProps: {
                'mun_id': mun_id
            },
            breakpoints: [0, 0.3, 0.5, 0.95],
            initialBreakpoint: 0.95
        });
        await paginaModal.present();
        paginaModal.onDidDismiss().then((data) => {
            this.cargarMunicipios();
        });
    }

    async alertEliminar(mun_id: number, mun_nombre: string) {
        const alert = await this.alertCtrl.create({
            header: 'Municipio',
            subHeader: 'Eliminar',
            message: '¿Estás seguro de eliminar el municipio ' + mun_nombre + '?',
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
                        this.eliminar(mun_id, mun_nombre);
                    }
                }
            ]
        });
        await alert.present();
    }

    async eliminar(mun_id: number, mun_nombre: string) {
        try {
            await this.MunicipioService.eliminar(mun_id, mun_nombre).subscribe(
                response => {
                    this.alertEliminado(mun_id, 'El municipio ' + mun_nombre + ' sido eliminado');
                },
                error => {
                    console.error('Error:', error);
                    if (error.response?.status == 204) {
                        this.alertEliminado(mun_id, 'El municipio ha sido eliminado');
                    }
                    if (error.response?.status == 500) {
                        this.alertEliminado(mun_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async alertEliminado(mun_id: number, msg = "") {
        const alert = await this.alertCtrl.create({
            header: 'Municipio',
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
        this.router.navigate(['/municipio']).then(() => {
            window.location.reload();
        });
    }

    async cargarTotal() {
        try {
            await this.MunicipioService.total(this.busqueda).subscribe(
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
        this.cargarMunicipios();
    }

    handleInput(event: any) {
        this.busqueda = event.target.value.toLowerCase();
        this.cargarMunicipios();
    }

}
