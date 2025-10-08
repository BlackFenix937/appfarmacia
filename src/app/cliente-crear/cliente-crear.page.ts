import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-cliente-crear',
  templateUrl: './cliente-crear.page.html',
  styleUrls: ['./cliente-crear.page.scss'],
  standalone:false,
})
export class ClienteCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
  ) { }

    public cliente!: FormGroup;
    baseUrl:string = "http://localhost:8080/clientes";
    ciudadUrl:string = "http://localhost:8080/ciudad";
    ciudad:any=[];

  ngOnInit() {
    this.cargarCiudades();
    this.formulario();
  }

  mensajes_validacion:any = {
    'cli_nombre' : [
        {type : 'required' , message : 'El nombre es obligatorio'},
        
    ],
    
    'cli_apellido_paterno' : [
        {type : 'required' , message : 'El apellido paterno es obligatorio.'},
        
    ],
    'cli_apellido_materno' : [
        {type : 'required' , message : 'El apellido materno es obligatorio.'},
        
    ],
    'cli_fecha_nacimiento' : [
        {type : 'required' , message : 'La fecha de nacimiento es obligatoria.'},
        
    ],
    'cli_direccion' : [
        {type : 'required' , message : 'La direccion es obligatoria.'},
        
    ],
    'cli_telefono' : [
        {type : 'required' , message : 'El telefono es obligatorio.'},
        
    ],
    'cli_correo' : [
        {type : 'required' , message : 'El correo es obligatorio.'},
        
    ],
    'cli_rfc' : [
        {type : 'required' , message : 'El RFC es obligatorio.'},
        
    ],
    'cli_fkciu_id' : [
        {type : 'required' , message : 'La ciudad es obligatoria.'},
        
    ],
}

private formulario() {
    this.cliente = this.formBuilder.group({
    cli_nombre: ['', [Validators.required]],
    cli_apellido_paterno: ['',[Validators.required]],
    cli_apellido_materno: ['', [Validators.required]],
    cli_fecha_nacimiento: ['',[Validators.required]],
    cli_direccion: ['', [Validators.required]],
    cli_telefono: ['',[Validators.required]],
    cli_correo: ['', [Validators.required]],
    cli_rfc: ['',[Validators.required]],
    cli_fkciu_id: ['',[Validators.required]],

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

async guardarDatos() {
    try {
    const ciudad = this.cliente?.value;
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
            this.alertGuardado(response.data.cli_nombre, 'El cliente ' + response.data.cli_nombre + ' ha sido registrado.');
        }
    }).catch( (error) => {
        if(error?.response?.status == 422) {
            this.alertGuardado(ciudad.cli_nombre, error?.response?.data[0]?.message, "Error");
        }     
    });
    } catch(e){
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

private async alertGuardado(cli_nombre: String, msg = "",  subMsg= "Guardado") {
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

}
