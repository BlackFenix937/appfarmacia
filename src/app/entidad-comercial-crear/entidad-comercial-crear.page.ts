import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EntidadComercial } from '../services/entidad-comercial';

@Component({
  selector: 'app-entidad-comercial-crear',
  templateUrl: './entidad-comercial-crear.page.html',
  styleUrls: ['./entidad-comercial-crear.page.scss'],
  standalone:false,
})
export class EntidadComercialCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
    private EntidadComercialService: EntidadComercial
  ) { }
  
  private editarDatos = [];
  @Input() ent_id: number | undefined;  
  public entidadcomercial!: FormGroup;
    baseUrl:string = "http://localhost:8080/entidadcomercials";
    ciudadUrl:string = "http://localhost:8080/ciudad";
    ciudad:any=[];
    tipos = [
    {'ent_tipo' : "Proveedor", 'entidad' : 'Proveedor'},
    {'ent_tipo' : "Distribuidor", 'entidad' : 'Distribuidor'},
];

  ngOnInit() {
    this.cargarCiudades();
    if (this.ent_id !== undefined) {
            this.getDetalles();
        }
    this.formulario();
  }

  mensajes_validacion:any = {
    'ent_nombre' : [
        {type : 'required' , message : 'El nombre es obligatorio'},
        
    ],
    
    'ent_tipo' : [
        {type : 'required' , message : 'Es obligatorio definir que tipo de entidad es.'},
        
    ],
    'ent_telefono' : [
        {type : 'required' , message : 'El numero telefonico es obligatorio.'},
        
    ],
    'ent_correo' : [
        {type : 'required' , message : 'El correo electronico es obligatoria.'},
        
    ],
    'ent_direccion' : [
        {type : 'required' , message : 'La direccion es obligatoria.'},
        
    ],
    'ent_codigo_postal' : [
        {type : 'required' , message : 'El codigo postal es obligatorio.'},
     
    ],
    'ent_fkciu_id' : [
        {type : 'required' , message : 'La ciudad es obligatoria.'},
        
    ],
}

private formulario() {
    this.entidadcomercial = this.formBuilder.group({
    ent_nombre: ['', [Validators.required]],
    ent_tipo: ['',[Validators.required]],
    ent_telefono: ['', [Validators.required]],
    ent_correo: ['', [Validators.required]],
    ent_direccion: ['',[Validators.required]],
    ent_codigo_postal: ['',[Validators.required]],
    ent_fkciu_id: ['',[Validators.required]],

      })
}

async cargarCiudades() {
    const response = await axios({
        method: 'get',
        url : this.ciudadUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.ciudad = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
}

/*async guardarDatos() {
    try {

        const entidadcomercial = this.entidadcomercial?.value;
            if (this.ent_id === undefined) {

    const entidadcomercial = this.entidadcomercial?.value;
    const response = await axios({
        method: 'post',
        url : this.baseUrl,
        data: entidadcomercial,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
        }
    }).then( (response) => {
        if(response?.status == 201) {
            this.alertGuardado(response.data.ent_nombre, 'La entidad comercial ' + response.data.ent_nombre + ' se ha registrado como '+response.data.ent_tipo);
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
            this.alertGuardado(entidadcomercial.ent_nombre, error?.response?.data[0]?.message, "Error");
        }     
    });
}
else{

    const response = await axios({
                    method: 'put',
                    url: this.baseUrl + '/' + this.ent_id,
                    data: entidadcomercial,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 100-token'
                    }
                }).then((response) => {
                    if (response?.status == 200) {
                        this.alertGuardado(response.data.ent_nombre, 'La entidad comercial ' + response.data.ent_nombre + ' ha sido actualizada');
                    }
                }).catch((error) => {
                    if (error?.response?.status == 422) {
                        this.alertGuardado(entidadcomercial.ent_nombre, error?.response?.data[0]?.message, "Error");
                    }
                });
            }

    } catch(e){
        console.log(e);
    }
}*/

async guardarDatos() {
        try {
            const entidadcomercial = this.entidadcomercial?.value;
            if (this.ent_id === undefined) {
                try {
                    await this.EntidadComercialService.crear(entidadcomercial).subscribe(
                        response => {
                            if (response?.status == 201) {
                                this.alertGuardado(response.data.ent_id, 'El la entidad comercial ' + entidadcomercial.ent_nombre + ' ha sido registrada');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(entidadcomercial.ent_id, error?.response?.data[0]?.message, "Error");
                            }
                            if (error?.response?.status == 500) {
                                this.alertGuardado(entidadcomercial.ent_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await this.EntidadComercialService.actualizar(this.ent_id, entidadcomercial).subscribe(
                        response => {
                            console.log(response)
                            if (response?.status == 200) {
                                this.alertGuardado(response.data.ent_id, 'La entidad comercial ' + entidadcomercial.med_nombre + ' ha sido actualizada');
                            }
                        },
                        error => {
                            if (error?.response?.status == 422) {
                                this.alertGuardado(entidadcomercial.ent_id, error?.response?.data[0]?.message, "Error");
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
    const control = this.entidadcomercial.get(controlName);
    if (control?.touched && control?.errors != null) {
        errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
}

private async alertGuardado(ent_nombre: String, msg = "",  subMsg= "Guardado") {
    const alert = await this.alert.create({
        header: 'Entidad Comercial',
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
            url: this.baseUrl + "/" + this.ent_id,
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.editarDatos = response.data;
            Object.keys(this.editarDatos).forEach((key: any) => {
                const control = this.entidadcomercial.get(String(key));
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
