import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Municipio } from '../services/municipio';

@Component({
    selector: 'app-municipio-crear',
    templateUrl: './municipio-crear.page.html',
    styleUrls: ['./municipio-crear.page.scss'],
    standalone: false,
})
export class MunicipioCrearPage implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private alert: AlertController,
        private modalCtrl: ModalController,
        private MunicipioService: Municipio,
    ) { }

    private editarDatos = [];
    @Input() mun_id: number | undefined;
    public municipio!: FormGroup;
    estados: any = [];
    estadoUrl: string = "http://localhost:8080/estado";
    baseUrl: string = "http://localhost:8080/municipios"




    ngOnInit() {
        this.cargarEstados();
        if (this.mun_id !== undefined) {
            this.getDetalles();
        }
        this.formulario();
    }

    mensajes_validacion: any = {
        'mun_nombre': [
            { type: 'required', message: 'Nombre(s) requeridos.' },

        ],

        'mun_fkestd_id': [
            { type: 'required', message: 'Nombre(s) requeridos.' },

        ],
    }

    private formulario() {
        this.municipio = this.formBuilder.group({
            mun_nombre: ['', [Validators.required]],
            mun_fkestd_id: ['', [Validators.required]],
        })
    }

    async cargarEstados() {
        const response = await axios({
            method: 'get',
            url: this.estadoUrl,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.estados = response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }

    /*  async guardarDatos() {
          try {
              const municipio = this.municipio?.value;
              const response = await axios({
                  method: 'post',
                  url: this.baseUrl,
                  data: municipio,
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer 100-token'
                  }
              }).then((response) => {
                  if (response?.status == 201) {
                      this.alertGuardado(response.data.mun_nombre, 'El municipio ' + response.data.mun_nombre + ' ha sido registrado');
                  }
              }).catch((error) => {
                  if (error?.response?.status == 422) {
                      this.alertGuardado(municipio.mun_nombre, error?.response?.data[0]?.message, "Error");
                  }
              });
          } catch (e) {
              console.log(e);
          }
      }*/

    async guardarDatos() {
        try {
            const municipio = this.municipio?.value;
            if (this.mun_id === undefined) {
                try {
                    await this.MunicipioService.crear(municipio).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.mun_id, 'El municipio ' + municipio.mun_nombre + ' ha sido registrado.');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(municipio.mun_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(municipio.mun_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.MunicipioService.actualizar(this.mun_id, municipio).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.mun_id, 'El municipio ' + municipio.mun_nombre + ' ha sido actualizado.');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(municipio.mun_id, error?.response?.data[0]?.message, "Error");
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
        const control = this.municipio.get(controlName);
        if (control?.touched && control?.errors != null) {
            errors = JSON.parse(JSON.stringify(control?.errors));
        }
        return errors;
    }

    private async alertGuardado(mun_nombre: String, msg = "", subMsg = "Guardado") {
        const alert = await this.alert.create({
            header: 'Municipio',
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
            url: this.baseUrl + "/" + this.mun_id,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.editarDatos = response.data;
            Object.keys(this.editarDatos).forEach((key: any) => {
                const control = this.municipio.get(String(key));
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
