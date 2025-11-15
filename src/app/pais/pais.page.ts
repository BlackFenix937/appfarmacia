import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { PaisCrearPage } from '../pais-crear/pais-crear.page';
import { Router } from '@angular/router';
import { Pais } from '../services/pais';


@Component({
    selector: 'app-pais',
    templateUrl: './pais.page.html',
    styleUrls: ['./pais.page.scss'],
    standalone: false
})
export class PaisPage implements OnInit {

    constructor(
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private router: Router,
        private PaisService: Pais

    ) { }

    paises: any = [];
    total: number = 0;
    page: string = "1";
    busqueda: string = '';

    ngOnInit() {
        this.cargarPaises();
        this.cargarTotal();
    }

    async cargarPaises() {
        const loading = await this.loadingCtrl.create({
            message: 'Cargando',
            spinner: 'bubbles',
        });
        await loading.present();
        try {
            await this.PaisService.listado('?page=' + this.page, this.busqueda).subscribe(
                response => {
                    this.paises = response;
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
            component: PaisCrearPage,
            breakpoints: [0, 0.3, 0.5, 0.95],
            initialBreakpoint: 0.95
        });
        await paginaModal.present();
        paginaModal.onDidDismiss().then((data) => {
            this.cargarPaises();
        });
    }

    async editar(pai_id: number) {
        const paginaModal = await this.modalCtrl.create({
            component: PaisCrearPage,
            componentProps: {
                'pai_id': pai_id
            },
            breakpoints: [0, 0.3, 0.5, 0.95],
            initialBreakpoint: 0.95
        });
        await paginaModal.present();
        paginaModal.onDidDismiss().then((data) => {
            this.cargarPaises();
        });
    }

    async alertEliminar(pai_id: number, pai_nombre: string) {
        const alert = await this.alertCtrl.create({
            header: 'Pais',
            subHeader: 'Eliminar',
            message: '¿Estás seguro de eliminar el pais ' + pai_nombre + '?',
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
                        this.eliminar(pai_id, pai_nombre);
                    }
                }
            ]
        });
        await alert.present();
    }

    async eliminar(pai_id: number, pai_nombre: string) {
        try {
            await this.PaisService.eliminar(pai_id, pai_nombre).subscribe(
                response => {
                    this.alertEliminado(pai_id, 'El Pais ' + pai_nombre + ' sido eliminado');
                },
                error => {
                    console.error('Error:', error);
                    if (error.response?.status == 204) {
                        this.alertEliminado(pai_id, 'El municipio ha sido eliminado');
                    }
                    if (error.response?.status == 500) {
                        this.alertEliminado(pai_id, 'No puedes eliminar porque tiene relaciones con otra tabla');
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async alertEliminado(pai_id: number, msg = "") {
        const alert = await this.alertCtrl.create({
            header: 'Pais',
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
        this.router.navigate(['/pais']).then(() => {
            window.location.reload();
        });
    }

    async cargarTotal() {
        try {
            await this.PaisService.total(this.busqueda).subscribe(
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
        this.cargarPaises();
    }

    handleInput(event: any) {
        this.busqueda = event.target.value.toLowerCase();
        this.cargarPaises();
    }

}
