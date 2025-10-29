import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Cliente } from '../services/cliente';

@Component({
    selector: 'app-cliente-crear',
    templateUrl: './cliente-crear.page.html',
    styleUrls: ['./cliente-crear.page.scss'],
    standalone: false,
})
export class ClienteCrearPage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private alert: AlertController,
        private modalCtrl: ModalController,
        private clientesService: Cliente,
    ) { }

    private editarDatos = [];
    @Input() cli_id: number | undefined;
    public cliente!: FormGroup;
    baseUrl: string = "http://localhost:8080/clientes";
    ciudadUrl: string = "http://localhost:8080/ciudad";
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
        const response = await axios({
            method: 'get',
            url: this.ciudadUrl,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.ciudad = response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }

    /*
    async guardarDatos() {
        try {

            const cliente = this.cliente?.value;
            if (this.cli_id===undefined){

            
            const response = await axios({
                method: 'post',
                url: this.baseUrl,
                data: cliente,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 100-token'
                }
            }).then((response) => {
                if (response?.status == 201) {
                    this.alertGuardado(response.data.cli_nombre, 'El cliente ' + response.data.cli_nombre + ' ha sido registrado.');
                }
            }).catch((error) => {
                if (error?.response?.status == 422) {
                    this.alertGuardado(cliente.cli_nombre, error?.response?.data[0]?.message, "Error");
                }
            });
        }
        else{

             const response = await axios({
              method: 'put',
              url: this.baseUrl + '/' + this.cli_id,
              data: cliente,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 100-token'
              }
            }).then((response) => {
                if (response?.status == 200) {
                    this.alertGuardado(response.data.cli_nombre, 'El cliente ' + response.data.cli_nombre + ' ha sido actualizado');
                }
            }).catch((error) => {
                if (error?.response?.status == 422) {
                    this.alertGuardado(cliente.cli_nombre, error?.response?.data[0]?.message, "Error");
                }
            });

        }
            
        } catch (e) {
            console.log(e);
        }
    }*/

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

    async getDetalles() {
        const response = await axios({
            method: 'get',
            url: this.baseUrl + "/" + this.cli_id,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.editarDatos = response.data;
            Object.keys(this.editarDatos).forEach((key: any) => {
                const control = this.cliente.get(String(key));
                if (control !== null) {
                    control.markAsTouched();
                    control.patchValue(this.editarDatos[key]);
                }
            })
        }).catch(function (error) {
            console.log(error);
        });
    }


}
