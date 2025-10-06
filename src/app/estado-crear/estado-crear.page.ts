import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estado-crear',
  templateUrl: './estado-crear.page.html',
  styleUrls: ['./estado-crear.page.scss'],
  standalone:false,
})
export class EstadoCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController
  ) { }

    public estado!: FormGroup;

  ngOnInit() {
        this.formulario();
  }

  mensajes_validacion:any = {
    'estd_nombre' : [
        {type : 'required' , message : 'Nombre(s) requeridos.'},
        
    ],


    'pai_nombre' : [
        {type : 'required' , message : 'Nombre(s) requeridos.'},
        
    ],
}

  private formulario() {
    this.estado = this.formBuilder.group({
    estd_nombre: ['',[Validators.required]],
    pai_nombre: ['',[Validators.required]],
    })
}

}
