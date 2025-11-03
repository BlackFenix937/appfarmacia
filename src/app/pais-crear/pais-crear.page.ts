import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Pais } from '../services/pais';

@Component({
    selector: 'app-pais-crear',
    templateUrl: './pais-crear.page.html',
    styleUrls: ['./pais-crear.page.scss'],
    standalone: false,
})
export class PaisCrearPage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private alert: AlertController,
        private modalCtrl: ModalController,
        private PaisService: Pais,
    ) { }

    private editarDatos = [];
    @Input() pai_id: number | undefined;
    public paises!: FormGroup;
    baseUrl: string = "http://localhost:8080/pais";



    ngOnInit() {
        if (this.pai_id !== undefined) {
            this.getDetalles();
        }
        this.formulario();
    }

    mensajes_validacion: any = {
        'pai_nombre': [
            { type: 'required', message: 'El nombre del pais es obligatorio' },

        ]
    }

    private formulario() {
        this.paises = this.formBuilder.group({
            pai_nombre: ['', [Validators.required]],
        })
    }

    /*    async guardarDatos() {
            try {
                const pais = this.paises?.value;
                const response = await axios({
                    method: 'post',
                    url: this.baseUrl,
                    data: pais,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 100-token'
                    }
                }).then((response) => {
                    if (response?.status == 201) {
                        this.alertGuardado(response.data.pai_nombre, 'El pais ' + response.data.pai_nombre + ' ha sido registrado');
                    }
                }).catch((error) => {
                    if (error?.response?.status == 422) {
                        this.alertGuardado(pais.estd_nombre, error?.response?.data[0]?.message, "Error");
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }*/

    async guardarDatos() {
        try {
            const pais = this.paises?.value;
            if (this.pai_id === undefined) {
                try {
                    await this.PaisService.crear(pais).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.pai_id, 'El pais ' + pais.pai_nombre + ' ha sido registrado.');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(pais.pai_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(pais.pai_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.PaisService.actualizar(this.pai_id, pais).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.pai_id, 'El pais ' + pais.pai_nombre + ' ha sido actualizado.');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(pais.pai_id, error?.response?.data[0]?.message, "Error");
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
        const control = this.paises.get(controlName);
        if (control?.touched && control?.errors != null) {
            errors = JSON.parse(JSON.stringify(control?.errors));
        }
        return errors;
    }

    private async alertGuardado(pai_nombre: String, msg = "", subMsg = "Guardado") {
        const alert = await this.alert.create({
            header: 'Pais',
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
            url: this.baseUrl + "/" + this.pai_id,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.editarDatos = response.data;
            Object.keys(this.editarDatos).forEach((key: any) => {
                const control = this.paises.get(String(key));
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
