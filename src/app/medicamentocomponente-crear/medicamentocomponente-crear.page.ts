import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Medicamentocomponente } from '../services/medicamentocomponente';
import { Medicamento } from '../services/medicamento';
import { Componente } from '../services/componente';

@Component({
  selector: 'app-medicamentocomponente-crear',
  templateUrl: './medicamentocomponente-crear.page.html',
  styleUrls: ['./medicamentocomponente-crear.page.scss'],
  standalone: false,
})
export class MedicamentocomponenteCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private medicamentoService: Medicamento,
    private componenteService: Componente,
    private medicompService: Medicamentocomponente,
  ) { }

  private editarDatos = [];
  @Input() medcomp_id: number | undefined;
  public medicamentocomponentes!: FormGroup;
  medicamento: any = [];
  componente: any = [];

  ngOnInit() {
    this.cargarComponentes();
    this.cargarMedicamentos();
    if (this.medcomp_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'med_id': [
      { type: 'required', message: 'El nombre del medicamento es obligatorio' },
    ],
    'comp_id': [
      { type: 'required', message: 'El nombre del componente es obligatorio.' },
    ],
  }

  async cargarMedicamentos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.medicamentoService.listado().subscribe(
        response => {
          this.medicamento = response;
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

  async cargarComponentes() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.componenteService.listado().subscribe(
        response => {
          this.componente = response;
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

  private formulario() {
    this.medicamentocomponentes = this.formBuilder.group({
      med_id: ['', [Validators.required]],
      comp_id: ['', [Validators.required]],
    })
  }

  async guardarDatos() {
    try {
      const medicomp = this.medicamentocomponentes?.value;
      if (this.medcomp_id === undefined) {
        try {
          await this.medicompService.crear(medicomp).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.medcomp_id, 'El componente del medicamento ha sido registrado.');
              }
            },
            error => {
              if (error?.response?.status == 401) {
                this.alertGuardado(medicomp.medcomp_id, "No tienes permisos para realizar esta acción.", "Error")
              }

              if (error?.response?.status == 422) {
                this.alertGuardado(medicomp.medcomp_id, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(medicomp.medcomp_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.medicompService.actualizar(this.medcomp_id, medicomp).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.medcomp_id, 'El componente del medicamento ha sido actualizado.');
              }
            },
            error => {
              if (error?.response?.status == 401) {
                this.alertGuardado(medicomp.medcomp_id, "No tienes permisos para realizar esta acción.", "Error")
              }
              if (error?.response?.status == 422) {
                this.alertGuardado(medicomp.medcomp_id, error?.response?.data[0]?.message, "Error");
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
    const control = this.medicamentocomponentes.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(medicamentoNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Medicamento Componente',
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
    this.medicompService.detalle(this.medcomp_id).subscribe({
      next: (data) => {
        this.editarDatos = data;
        Object.keys(this.editarDatos).forEach((key: any) => {
          const control = this.medicamentocomponentes.get(String(key));
          if (control !== null) {
            control.markAsTouched();
            control.patchValue(this.editarDatos[key]);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener detalles del componente del medicamento:', error);
      }
    });
  }

}
