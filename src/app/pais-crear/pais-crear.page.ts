import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-pais-crear',
  templateUrl: './pais-crear.page.html',
  styleUrls: ['./pais-crear.page.scss'],
  standalone:false,
})
export class PaisCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController
  ) { }

  public paises!: FormGroup;
  baseUrl:string = "http://localhost:8080/pais";



  ngOnInit() {
    this.formulario();
  }

  mensajes_validacion:any = {
    'pai_nombre' : [
        {type : 'required' , message : 'El nombre del pais es obligatorio'},
        
    ]}

    private formulario() {
    this.paises = this.formBuilder.group({
    pai_nombre: ['',[Validators.required]],
    })
}

async guardarDatos() {
    try {
    const pais = this.paises?.value;
    const response = await axios({
        method: 'post',
        url : this.baseUrl,
        data: pais,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 100-token'
        }
    }).then( (response) => {
        if(response?.status == 201) {
            this.alertGuardado(response.data.pai_nombre, 'El pais ' + response.data.pai_nombre + ' ha sido registrado');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
            this.alertGuardado(pais.estd_nombre, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
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

private async alertGuardado(pai_nombre: String, msg = "",  subMsg= "Guardado") {
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

}
