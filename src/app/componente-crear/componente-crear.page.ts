import { Component, Input, OnInit } from '@angular/core';
import { Componente } from '../services/componente';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-componente-crear',
  templateUrl: './componente-crear.page.html',
  styleUrls: ['./componente-crear.page.scss'],
  standalone: false,
})
export class ComponenteCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private componenteService: Componente
  ) { }

  private editarDatos = [];
  @Input() comp_id: number | undefined;
  public componentes!: FormGroup;

  ngOnInit() {
    if (this.comp_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'comp_nombre': [
      { type: 'required', message: 'El nombre del componente es obligatorio.' },

    ],
  }

  private formulario() {
    this.componentes = this.formBuilder.group({
      comp_nombre: ['', [Validators.required]],
    })
  }

  async guardarDatos() {
    try {
      const componente = this.componentes?.value;
      if (this.comp_id === undefined) {
        try {
          await this.componenteService.crear(componente).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.comp_id, 'El componente ' + componente.comp_nombre + ' ha sido registrado.');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(componente.comp_id, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(componente.comp_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(componente.comp_id, "No tienes permisos para realizar esta acción.", "Error")
              }

            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.componenteService.actualizar(this.comp_id, componente).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.comp_id, 'El componente ' + componente.comp_nombre + ' ha sido actualizado.');
              }
            },
            error => {
              if (error?.response?.status == 401) {
                this.alertGuardado(componente.comp_id, "No tienes permisos para realizar esta acción.", "Error")
              }
              if (error?.response?.status == 422) {
                this.alertGuardado(componente.comp_id, error?.response?.data[0]?.message, "Error");
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
    const control = this.componentes.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(comp_nombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Componentes',
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

  getDetalles() {
    this.componenteService.detalle(this.comp_id).subscribe({
      next: (data) => {
        this.editarDatos = data;
        Object.keys(this.editarDatos).forEach((key: any) => {
          const control = this.componentes.get(String(key));
          if (control !== null) {
            control.markAsTouched();
            control.patchValue(this.editarDatos[key]);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener detalles del componente:', error);
      }
    });
  }
}
