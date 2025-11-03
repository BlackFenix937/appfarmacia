import { Component, Input, OnInit } from '@angular/core';
import { EntidadMedicamento } from '../services/entidad-medicamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
    selector: 'app-entidad-medicamento-crear',
    templateUrl: './entidad-medicamento-crear.page.html',
    styleUrls: ['./entidad-medicamento-crear.page.scss'],
    standalone: false,
})
export class EntidadMedicamentoCrearPage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private alert: AlertController,
        private modalCtrl: ModalController,
        private EntidadMedicamentoService: EntidadMedicamento
    ) { }

    private editarDatos = [];
    @Input() entmed_id: number | undefined;
    public entidadmedicamento!: FormGroup;
    baseUrl: string = "http://localhost:8080/entidadmedicamentos";
    medicamentoUrl: string ="http://localhost:8080/medicamentos";
    entidadcomercialUrl: string ="http://localhost:8080/entidadcomercials";
    medicamento:any=[];
    entidadcomercial:any=[];
    estados = [
        { 'entmed_fkestado_id': "1", 'entidadmed': 'Comprado' },
        { 'entmed_fkestado_id': "2", 'entidadmed': 'Devuelto' },
        { 'entmed_fkestado_id': "3", 'entidadmed': 'En proceso de compra' },
        { 'entmed_fkestado_id': "4", 'entidadmed': 'Entregado' },
        { 'entmed_fkestado_id': "5", 'entidadmed': 'En camino' },

    ];

    ngOnInit() {
        this.cargarMedicamentos();
        this.cargarEntidadComercial();
        if (this.entmed_id !== undefined) {
            this.getDetalles();
        }
        this.formulario();
    }

    mensajes_validacion: any = {
        'ent_id': [
            { type: 'required', message: 'El nombre de la entidad comercial es obligatorio' },

        ],

        'med_id': [
            { type: 'required', message: 'El nombre del medicamento es obligatorio' },

        ],
        'entmed_precio': [
            { type: 'required', message: 'El precio de venta es obligatorio.' },

        ],
        'entmed_tiempo_entrega': [
            { type: 'required', message: 'El tiempo de entrega es obligatorio.' },

        ],
        'entmed_fkestado_id': [
            { type: 'required', message: 'El tipo de estado es obligatorio.' },

        ],
    }

    private formulario() {
        this.entidadmedicamento = this.formBuilder.group({
            ent_id: ['', [Validators.required]],
            med_id: ['', [Validators.required]],
            entmed_precio: ['', [Validators.required]],
            entmed_tiempo_entrega: ['', [Validators.required]],
            entmed_fkestado_id: ['', [Validators.required]],
        })
    }

    async cargarMedicamentos() {
    const response = await axios({
        method: 'get',
        url : this.medicamentoUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.medicamento = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
}

async cargarEntidadComercial() {
    const response = await axios({
        method: 'get',
        url : this.entidadcomercialUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.entidadcomercial = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
}

    async guardarDatos() {
        try {
            const entidadmedicamento = this.entidadmedicamento?.value;
            if (this.entmed_id === undefined) {
                try {
                    await this.EntidadMedicamentoService.crear(entidadmedicamento).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.entmed_id, 'El registro del envio ha sido registrado.');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(entidadmedicamento.entmed_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(entidadmedicamento.entmed_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.EntidadMedicamentoService.actualizar(this.entmed_id, entidadmedicamento).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.entmed_id, 'El registro ' + this.entmed_id + ' ha sido actualizado.');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(entidadmedicamento.entmed_id, error?.response?.data[0]?.message, "Error");
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
        const control = this.entidadmedicamento.get(controlName);
        if (control?.touched && control?.errors != null) {
            errors = JSON.parse(JSON.stringify(control?.errors));
        }
        return errors;
    }

    private async alertGuardado(ent_nombre: String, msg = "", subMsg = "Guardado") {
        const alert = await this.alert.create({
            header: 'Entidad medicamento',
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
            url: this.baseUrl + "/" + this.entmed_id,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.editarDatos = response.data;
            Object.keys(this.editarDatos).forEach((key: any) => {
                const control = this.entidadmedicamento.get(String(key));
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
