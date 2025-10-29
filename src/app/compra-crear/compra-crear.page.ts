import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-compra-crear',
  templateUrl: './compra-crear.page.html',
  styleUrls: ['./compra-crear.page.scss'],
  standalone: false,
})
export class CompraCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
  ) { }


  public compra!: FormGroup;
    baseUrl:string = "http://localhost:8080/compras";
    clienteUrl:string = "http://localhost:8080/clientes";
    tipoestadoUrl:string = "http://localhost:8080/tipoestados";
    tipoestado:any=[];
    cliente:any=[];


  ngOnInit() {
    this.cargarClientes();
    this.formulario();
  }

   mensajes_validacion:any = {
    'cli_id' : [
        {type : 'required' , message : 'El nombre es obligatorio'},
        
    ],
    
    'comp_fecha' : [
        {type : 'required' , message : 'El apellido paterno es obligatorio.'},
        
    ],
    'comp_total' : [
        {type : 'required' , message : 'El apellido materno es obligatorio.'},
        
    ],
    'comp_fkestado_id' : [
        {type : 'required' , message : 'La fecha de nacimiento es obligatoria.'},
        
    ],
}

private formulario() {
    this.compra = this.formBuilder.group({
    cli_id: ['', [Validators.required]],
    comp_fecha: ['',[Validators.required]],
    comp_total: ['', [Validators.required]],
    comp_fkestado_id: ['',[Validators.required]],
      })
}

async cargarClientes() {
    const response = await axios({
        method: 'get',
        url : this.clienteUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then( (response) => {
        this.cliente = response.data;
    }).catch(function (error) {
        console.log(error);     
    });
}

}
