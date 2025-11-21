import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Compra } from '../services/compra';
import { Cliente } from '../services/cliente';

@Component({
  selector: 'app-compra-crear',
  templateUrl: './compra-crear.page.html',
  styleUrls: ['./compra-crear.page.scss'],
  standalone: false,
})
export class CompraCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private clienteService: Cliente,
    private compraService: Compra,
  ) { }

  private editarDatos = [];
  @Input() comp_id: number | undefined;
  public compra!: FormGroup;
  tipoestado: any = [];
  cliente: any = [];
  estados = [
    { 'comp_fkestado_id': "1", 'compest': 'Comprado' },
    { 'comp_fkestado_id': "2", 'compest': 'Devuelto' },
    { 'comp_fkestado_id': "3", 'compest': 'En proceso de compra' },
    { 'comp_fkestado_id': "4", 'compest': 'Entregado' },
    { 'comp_fkestado_id': "5", 'compest': 'En camino' },

  ];

  ngOnInit() {
    this.cargarClientes();
    if (this.comp_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'cli_id': [
      { type: 'required', message: 'El cliente es obligatorio' },

    ],

    'comp_fecha': [
      { type: 'required', message: 'La fecha de la compra es obligatoria' },

    ],
    'comp_total': [
      { type: 'required', message: 'El total de la compra es obligatorio' },

    ],
    'comp_fkestado_id': [
      { type: 'required', message: 'El estado de la compra es obligatorio.' },

    ],
  }

  private formulario() {
    this.compra = this.formBuilder.group({
      cli_id: ['', [Validators.required]],
      comp_fecha: ['', [Validators.required]],
      comp_total: ['', [Validators.required]],
      comp_fkestado_id: ['', [Validators.required]],
    })
  }
  async cargarClientes() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.clienteService.listado().subscribe(
        response => {
          this.cliente = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

  async guardarDatos() {
    try {
      const compra = this.compra?.value;
      if (this.comp_id === undefined) {
        try {
          await this.compraService.crear(compra).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.comp_id, 'La compra ' + compra.comp_id + ' ha sido registrada');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(compra.comp_id, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(compra.comp_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(compra.comp_id, "No tienes permisos para realizar esta acción.", "Error")
              }

            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.compraService.actualizar(this.comp_id, compra).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.ciu_id, 'La compra ' + compra.comp_id + ' ha sido actualizada');
              }
            },
            error => {
              if (error?.response?.status == 401) {
                this.alertGuardado(compra.comp_id, "No tienes permisos para realizar esta acción.", "Error")
              }
              if (error?.response?.status == 422) {
                this.alertGuardado(compra.comp_id, error?.response?.data[0]?.message, "Error");
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

  private async alertGuardado(compra: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Compra',
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

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.compra.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  getDetalles() {
    this.compraService.detalle(this.comp_id).subscribe({
      next: (data) => {
        this.editarDatos = data;
        Object.keys(this.editarDatos).forEach((key: any) => {
          const control = this.compra.get(String(key));
          if (control !== null) {
            control.markAsTouched();
            control.patchValue(this.editarDatos[key]);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener detalles de la compra:', error);
      }
    });
  }

}
