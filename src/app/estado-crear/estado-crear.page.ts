import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Estado } from '../services/estado';

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
    ) { }

    private editarDatos = [];
    @Input() estd_id: number | undefined;
    public estados!: FormGroup;
    pais: any = [];
    paisUrl: string = "http://localhost:8080/pais";
    baseUrl: string = "http://localhost:8080/estados";


    ngOnInit() {
        this.cargarPais();
        if (this.estd_id !== undefined) {
            this.getDetalles();
        }
        this.formulario();
    }

    mensajes_validacion: any = {
        'estd_nombre': [
            { type: 'required', message: 'El nombre del estado es obligatorio' },

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
        const response = await axios({
            method: 'get',
            url: this.paisUrl,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.pais = response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }

    /*    async guardarDatos() {
            try {
    
                const estado = this.estados?.value;
                if (this.estd_id === undefined) {
    
                    const estados = this.estados?.value;
                    const response = await axios({
                        method: 'post',
                        url: this.baseUrl,
                        data: estados,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 100-token'
                        }
                    }).then((response) => {
                        if (response?.status == 201) {
                            this.alertGuardado(response.data.estd_nombre, 'El estado ' + response.data.estd_nombre + ' ha sido registrado');
                        }
                    }).catch((error) => {
                        if (error?.response?.status == 422) {
                            this.alertGuardado(estados.estd_nombre, error?.response?.data[0]?.message, "Error");
                        }
                    });
                } else {
                    const response = await axios({
                        method: 'put',
                        url: this.baseUrl + '/' + this.estd_id,
                        data: estado,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 100-token'
                        }
                    }).then((response) => {
                        if (response?.status == 200) {
                            this.alertGuardado(response.data.estd_nombre, 'El estado ' + response.data.estd_nombre + ' ha sido actualizado.');
                        }
                    }).catch((error) => {
                        if (error?.response?.status == 422) {
                            this.alertGuardado(estado.estd_nombre, error?.response?.data[0]?.message, "Error");
                        }
                    });
                }
    
            } catch (e) {
                console.log(e);
            }
        }*/

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

    async getDetalles() {
        const response = await axios({
            method: 'get',
            url: this.baseUrl + "/" + this.estd_id,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.editarDatos = response.data;
            Object.keys(this.editarDatos).forEach((key: any) => {
                const control = this.estados.get(String(key));
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
