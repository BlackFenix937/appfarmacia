import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Medicamento } from '../services/medicamento';

@Component({
  selector: 'app-medicamento-crear',
  templateUrl: './medicamento-crear.page.html',
  styleUrls: ['./medicamento-crear.page.scss'],
  standalone:false,
})
export class MedicamentoCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
    private medicamentosService: Medicamento,
  ) { }
  
  private editarDatos = [];
  @Input() med_id: number | undefined;
  public medicamento!: FormGroup;
  baseUrl:string = "http://localhost:8080/medicamentos";

  ngOnInit() {
    if (this.med_id !== undefined) {
            this.getDetalles();
        }
    this.formulario();
  }

  mensajes_validacion:any = {
    'med_nombre' : [
        {type : 'required' , message : 'El nombre del medicamento es obligatorio'},
        
    ],
    
    'med_descripcion' : [
        {type : 'required' , message : 'La descripción es obligatoria.'},
        
    ],

    'med_presentacion' : [
        {type : 'required' , message : 'La presentación es obligatoria.'},
        
    ],
    'med_concentracion' : [
        {type : 'required' , message : 'La concentración es obligatoria.'},
        
    ],

    'med_fecha_caducidad' : [
        {type : 'required' , message : 'La fecha de caducidad es obligatoria.'},
        
    ],
    'med_precio_unitario' : [
        {type : 'required' , message : 'El precio es obligatorio.'},
        
    ],

    'med_lote' : [
        {type : 'required' , message : 'El lote es obligatorio.'},
        
    ],
    'med_stock' : [
        {type : 'required' , message : 'El stock es obligatorio.'},
        
    ],
}

private formulario() {
    this.medicamento = this.formBuilder.group({
    med_nombre: ['', [Validators.required]],
    med_descripcion: ['',[Validators.required]],
    med_presentacion: ['', [Validators.required]],
    med_concentracion: ['',[Validators.required]],
    med_fecha_caducidad: ['', [Validators.required]],
    med_precio_unitario: ['',[Validators.required]],
    med_lote: ['', [Validators.required]],
    med_stock: ['',[Validators.required]],    
  })
}

/*
async guardarDatos() {
    try {
    const ciudad = this.medicamento?.value;
    const response = await axios({
        method: 'post',
        url : this.baseUrl,
        data: ciudad,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
        }
    }).then( (response) => {
        if(response?.status == 201) {
            this.alertGuardado(response.data.med_nombre, 'El medicamento ' + response.data.med_nombre + ' ha sido registrado.');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
            this.alertGuardado(ciudad.med_nombre, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
        console.log(e);
    }
}*/

async guardarDatos() {
        try {
            const medicamento = this.medicamento?.value;
            if (this.med_id === undefined) {
                try {
                    await this.medicamentosService.crear(medicamento).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.med_id, 'El medicamento ' + medicamento.med_nombre + ' ha sido registrado');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(medicamento.med_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(medicamento.med_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.medicamentosService.actualizar(this.med_id, medicamento).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.med_id, 'El medicamento ' + medicamento.med_nombre + ' ha sido actualizado');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(medicamento.med_id, error?.response?.data[0]?.message, "Error");
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
    const control = this.medicamento.get(controlName);
    if (control?.touched && control?.errors != null) {
        errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
}

private async alertGuardado(med_nombre: String, msg = "",  subMsg= "Guardado") {
    const alert = await this.alert.create({
        header: 'Medicamento',
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
            url: this.baseUrl + "/" + this.med_id,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.editarDatos = response.data;
            Object.keys(this.editarDatos).forEach((key: any) => {
                const control = this.medicamento.get(String(key));
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
