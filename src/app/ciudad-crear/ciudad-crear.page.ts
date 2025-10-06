import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-ciudad-crear',
  templateUrl: './ciudad-crear.page.html',
  styleUrls: ['./ciudad-crear.page.scss'],
  standalone:false,
})
export class CiudadCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
  ) { }

  public ciudades!: FormGroup;
  baseUrl:string = "http://localhost:8080/ciudads";
  municipioUrl:string = "http://localhost:8080/municipio";
  municipios:any=[];


  ngOnInit() {
    this.cargarMunicipios();
    this.formulario();
  }

  mensajes_validacion:any = {
    'ciu_nombre' : [
        {type : 'required' , message : 'El nombre de la ciudad es obligatorio'},
        
    ],
    
    'ciu_fkmun_id' : [
        {type : 'required' , message : 'El municipio es obligatorio.'},
        
    ],
}

private formulario() {
    this.ciudades = this.formBuilder.group({
    ciu_nombre: ['', [Validators.required]],
    ciu_fkmun_id: ['',[Validators.required]],    })
}

async cargarMunicipios() {
    const response = await axios({
        method: 'get',
        url : this.municipioUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.municipios = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
}

async guardarDatos() {
    try {
    const ciudad = this.ciudades?.value;
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
            this.alertGuardado(response.data.ciu_nombre, 'La ciudad ' + response.data.ciu_nombre + ' ha sido registrada.');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
            this.alertGuardado(ciudad.ciu_nombre, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
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

private async alertGuardado(ciu_nombre: String, msg = "",  subMsg= "Guardado") {
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

}
