import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Estado } from '../services/estado';
import { Pais } from '../services/pais';

@Component({
    selector: 'app-estado-crear',
    templateUrl: './estado-crear.page.html',
    styleUrls: ['./estado-crear.page.scss'],
    standalone: false,
})
export class EstadoCrearPage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private alert: AlertController,
        private modalCtrl: ModalController,
        private EstadosService: Estado,
        private PaisService: Pais,
        private loadingCtrl: LoadingController,

    ) { }

    private editarDatos = [];
    @Input() estd_id: number | undefined;
    public estados!: FormGroup;
    pais: any = [];

    ngOnInit() {
        this.cargarPais();
        if (this.estd_id !== undefined) {
            this.getDetalles();
        }
        this.formulario();
    }

    mensajes_validacion: any = {
        'estd_nombre': [
            { type: 'required', message: 'El nombre del estado es obligatorio.' },

        ],
        'estd_fkpai_id': [
            { type: 'required', message: 'El pais es obligatorio.' },

        ],
    }

    private formulario() {
        this.estados = this.formBuilder.group({
            estd_nombre: ['', [Validators.required]],
            estd_fkpai_id: ['', [Validators.required]],
        })
    }

    async cargarPais() {
        const loading = await this.loadingCtrl.create({
            message: 'Cargando',
            spinner: 'bubbles',
        });
        await loading.present();
        try {
            await this.PaisService.listado().subscribe(
                response => {
                    this.pais = response;
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

    async guardarDatos() {
        try {
            const estado = this.estados?.value;
            if (this.estd_id === undefined) {
                try {
                    await this.EstadosService.crear(estado).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.estd_id, 'El estado ' + estado.estd_nombre + ' ha sido registrado');
                            }
                        },
                        error => {
                            if (error?.response?.status == 401) {
                                this.alertGuardado(estado.estd_id, "No tienes permisos para realizar esta acción.", "Error")
                            }
                            if (error?.response?.status == 422) {
                                this.alertGuardado(estado.estd_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(estado.estd_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.EstadosService.actualizar(this.estd_id, estado).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.ciu_id, 'El estado ' + estado.estd_nombre + ' ha sido actualizado');
                            }
                        },
                        error => {
                            if (error?.response?.status == 401) {
                                this.alertGuardado(estado.estd_id, "No tienes permisos para realizar esta acción.", "Error")
                            }
                            if (error?.response?.status == 422) {
                                this.alertGuardado(estado.estd_id, error?.response?.data[0]?.message, "Error");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    public getError(controlName: string) {
        let errors: any[] = [];
        const control = this.estados.get(controlName);
        if (control?.touched && control?.errors != null) {
            errors = JSON.parse(JSON.stringify(control?.errors));
        }
        return errors;
    }

    private async alertGuardado(estd_nombre: String, msg = "", subMsg = "Guardado") {
        const alert = await this.alert.create({
            header: 'Estado',
            subHeader: subMsg,
            message: msg,
            cssClass: 'alert-center',
            buttons: [
                {
                    text: 'Continuar',
                    role: 'cancel',
                },
                {
                    text: 'Salir',
                    role: 'confirm',
                    handler: () => {
                        this.modalCtrl.dismiss();
                    },
                },
            ],
        });
        await alert.present();
    }

    getDetalles() {
        this.EstadosService.detalle(this.estd_id).subscribe({
            next: (data) => {
                this.editarDatos = data;
                Object.keys(this.editarDatos).forEach((key: any) => {
                    const control = this.estados.get(String(key));
                    if (control !== null) {
                        control.markAsTouched();
                        control.patchValue(this.editarDatos[key]);
                    }
                });
            },
            error: (error) => {
                console.error('Error al obtener detalles del estado:', error);
            }
        });
    }

}
