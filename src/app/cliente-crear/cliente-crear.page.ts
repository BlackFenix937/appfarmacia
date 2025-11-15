import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Cliente } from '../services/cliente';
import { Ciudad } from '../services/ciudad';

@Component({
    selector: 'app-cliente-crear',
    templateUrl: './cliente-crear.page.html',
    styleUrls: ['./cliente-crear.page.scss'],
    standalone: false,
})
export class ClienteCrearPage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private loadingCtrl: LoadingController,
        private CiudadService: Ciudad,
        private alert: AlertController,
        private modalCtrl: ModalController,
        private clientesService: Cliente,
    ) { }

    private editarDatos = [];
    @Input() cli_id: number | undefined;
    public cliente!: FormGroup;
    ciudad: any = [];

    ngOnInit() {
        this.cargarCiudades();
        if (this.cli_id !== undefined) {
            this.getDetalles();
        }
        this.formulario();
    }

    mensajes_validacion: any = {
        'cli_nombre': [
            { type: 'required', message: 'El nombre es obligatorio' },

        ],

        'cli_apellido_paterno': [
            { type: 'required', message: 'El apellido paterno es obligatorio.' },

        ],
        'cli_apellido_materno': [
            { type: 'required', message: 'El apellido materno es obligatorio.' },

        ],
        'cli_fecha_nacimiento': [
            { type: 'required', message: 'La fecha de nacimiento es obligatoria.' },

        ],
        'cli_direccion': [
            { type: 'required', message: 'La direccion es obligatoria.' },

        ],
        'cli_telefono': [
            { type: 'required', message: 'El telefono es obligatorio.' },

        ],
        'cli_correo': [
            { type: 'required', message: 'El correo es obligatorio.' },

        ],
        'cli_rfc': [
            { type: 'required', message: 'El RFC es obligatorio.' },

        ],
        'cli_fkciu_id': [
            { type: 'required', message: 'La ciudad es obligatoria.' },

        ],
    }

    private formulario() {
        this.cliente = this.formBuilder.group({
            cli_nombre: ['', [Validators.required]],
            cli_apellido_paterno: ['', [Validators.required]],
            cli_apellido_materno: ['', [Validators.required]],
            cli_fecha_nacimiento: ['', [Validators.required]],
            cli_direccion: ['', [Validators.required]],
            cli_telefono: ['', [Validators.required]],
            cli_correo: ['', [Validators.required]],
            cli_rfc: ['', [Validators.required]],
            cli_fkciu_id: ['', [Validators.required]],

        })
    }

    async cargarCiudades() {
        const loading = await this.loadingCtrl.create({
            message: 'Cargando',
            spinner: 'bubbles',
        });
        await loading.present();
        try {
            await this.CiudadService.listado().subscribe(
                response => {
                    this.ciudad = response;
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
            const cliente = this.cliente?.value;
            if (this.cli_id === undefined) {
                try {
                    await this.clientesService.crear(cliente).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.cli_id, 'El cliente ' + cliente.cli_nombre + ' ha sido registrado');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(cliente.cli_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(cliente.cli_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                            if (error?.response?.status == 401) {
                                this.alertGuardado(cliente.cli_id, "No tienes permisos para realizar esta acción.", "Error")
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.clientesService.actualizar(this.cli_id, cliente).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.cli_id, 'El cliente ' + cliente.cli_nombre + ' ha sido actualizado');
                            }
                        },
                        error => {
                            if (error?.response?.status == 401) {
                                this.alertGuardado(cliente.cli_id, "No tienes permisos para realizar esta acción.", "Error")
                            }
                            if (error?.response?.status == 422) {
                                this.alertGuardado(cliente.cli_id, error?.response?.data[0]?.message, "Error");
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
        const control = this.cliente.get(controlName);
        if (control?.touched && control?.errors != null) {
            errors = JSON.parse(JSON.stringify(control?.errors));
        }
        return errors;
    }

    private async alertGuardado(cli_nombre: String, msg = "", subMsg = "Guardado") {
        const alert = await this.alert.create({
            header: 'Cliente',
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
        this.clientesService.detalle(this.cli_id).subscribe({
            next: (data) => {
                this.editarDatos = data;
                Object.keys(this.editarDatos).forEach((key: any) => {
                    const control = this.cliente.get(String(key));
                    if (control !== null) {
                        control.markAsTouched();
                        control.patchValue(this.editarDatos[key]);
                    }
                });
            },
            error: (error) => {
                console.error('Error al obtener detalles del cliente:', error);
            }
        });
    }

}
