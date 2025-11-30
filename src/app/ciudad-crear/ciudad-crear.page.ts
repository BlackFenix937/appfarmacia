import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Ciudad } from '../services/ciudad';
import { Municipio } from '../services/municipio';

@Component({
    selector: 'app-ciudad-crear',
    templateUrl: './ciudad-crear.page.html',
    styleUrls: ['./ciudad-crear.page.scss'],
    standalone: false,
})
export class CiudadCrearPage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private loadingCtrl: LoadingController,
        private alert: AlertController,
        private modalCtrl: ModalController,
        private CiudadService: Ciudad,
        private MunicipioService: Municipio
    ) { }

    private editarDatos = [];
    @Input() ciu_id: number | undefined;
    public ciudades!: FormGroup;
    municipios: any = [];

    ngOnInit() {
        this.cargarMunicipios();
        if (this.ciu_id !== undefined) {
            this.getDetalles();
        }
        this.formulario();
    }

    mensajes_validacion: any = {
        'ciu_nombre': [
            { type: 'required', message: 'El nombre de la ciudad es obligatorio.' },

        ],

        'ciu_fkmun_id': [
            { type: 'required', message: 'El municipio es obligatorio.' },

        ],
    }

    private formulario() {
        this.ciudades = this.formBuilder.group({
            ciu_nombre: ['', [Validators.required]],
            ciu_fkmun_id: ['', [Validators.required]],
        })
    }

    async cargarMunicipios() {
        const loading = await this.loadingCtrl.create({
            message: 'Cargando',
            spinner: 'bubbles',
        });
        await loading.present();
        try {
            await this.MunicipioService.listado().subscribe(
                response => {
                    this.municipios = response;
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
            const ciudad = this.ciudades?.value;
            if (this.ciu_id === undefined) {
                try {
                    await this.CiudadService.crear(ciudad).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.ciu_id, 'La ciudad ' + ciudad.ciu_nombre + ' ha sido registrada');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(ciudad.ciu_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(ciudad.ciu_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                            if (error?.response?.status == 401) {
                                this.alertGuardado(ciudad.ciu_id, "No tienes permisos para realizar esta acción.", "Error")
                            }

                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.CiudadService.actualizar(this.ciu_id, ciudad).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.ciu_id, 'La ciudad ' + ciudad.ciu_nombre + ' ha sido actualizada');
                            }
                        },
                        error => {
                            if (error?.response?.status == 401) {
                                this.alertGuardado(ciudad.ciu_id, "No tienes permisos para realizar esta acción.", "Error")
                            }
                            if (error?.response?.status == 422) {
                                this.alertGuardado(ciudad.ciu_id, error?.response?.data[0]?.message, "Error");
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
        const control = this.ciudades.get(controlName);
        if (control?.touched && control?.errors != null) {
            errors = JSON.parse(JSON.stringify(control?.errors));
        }
        return errors;
    }

    private async alertGuardado(ciu_nombre: String, msg = "", subMsg = "Guardado") {
        const alert = await this.alert.create({
            header: 'Ciudad',
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
        this.CiudadService.detalle(this.ciu_id).subscribe({
            next: (data) => {
                this.editarDatos = data;
                Object.keys(this.editarDatos).forEach((key: any) => {
                    const control = this.ciudades.get(String(key));
                    if (control !== null) {
                        control.markAsTouched();
                        control.patchValue(this.editarDatos[key]);
                    }
                });
            },
            error: (error) => {
                console.error('Error al obtener detalles de la ciudad:', error);
            }
        });
    }
}
