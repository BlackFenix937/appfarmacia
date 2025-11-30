import { Component, Input, OnInit } from '@angular/core';
import { Devolucion } from '../services/devolucion';
import { Compradetalle } from '../services/compradetalle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-devolucion-crear',
  templateUrl: './devolucion-crear.page.html',
  styleUrls: ['./devolucion-crear.page.scss'],
  standalone: false,
})
export class DevolucionCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private devolucionService: Devolucion,
    private compDetService: Compradetalle,
  ) { }

  private editarDatos = [];
  @Input() dev_id: number | undefined;
  public devolucion!: FormGroup;
  compradetalle: any = [];

  ngOnInit() {
    this.cargarCompraDetalle();
    if (this.dev_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'det_id': [
      { type: 'required', message: 'Es obligatorio cargar la compra para la devolución.' },
    ],
    'dev_cantidad': [
      { type: 'required', message: 'La cantidad a devolver es obligatoria.' },
    ],
    'dev_motivo': [
      { type: 'required', message: 'El motivo de la devolución es obligatorio.' },
    ],
    'dev_fecha': [
      { type: 'required', message: 'La fecha de la devolución es obligatoria.' },
    ],
  }

  private formulario() {
    const fechaActual = new Date().toISOString().split('T')[0];

    this.devolucion = this.formBuilder.group({
      det_id: ['', [Validators.required]],
      dev_motivo: ['', [Validators.required]],
      dev_fecha: [fechaActual, [Validators.required]],
      dev_fkestado_id: ['6', [Validators.required]],
      dev_cantidad: ['', [Validators.required]],


    });
    this.devolucion.get('dev_fecha')?.disable();
  }

  async cargarCompraDetalle() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.compDetService.listado('?expand=medicamentoNombre').subscribe(
        response => {
          this.compradetalle = response;
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

  onCompraSeleccionada(event: any) {
    const det_id = event.detail.value;
    const compra = this.compradetalle.find((c: any) => c.det_id === det_id);

    if (compra) {
      this.devolucion.patchValue({
        dev_cantidad: compra.det_cantidad
      });
    }
    console.log('dev_cantidad:', this.devolucion.get('dev_cantidad')?.value);

  }


  async guardarDatos() {
    try {
      const devolucion = this.devolucion?.value;

      const detalleSeleccionado = this.compradetalle.find((c: any) => c.det_id === devolucion.det_id);
      const nombreMedicamento = detalleSeleccionado ? detalleSeleccionado.medicamentoNombre : 'Medicamento';

      if (this.dev_id === undefined) {
        try {
          await this.devolucionService.crear(devolucion).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(
                  response.data.dev_id,
                  `La devolución de ${nombreMedicamento} ha sido registrada`
                );
              }
            },
            error => {
              if (error?.response?.status == 401) {
                this.alertGuardado(devolucion.det_id, "No tienes permisos para realizar esta acción.", "Error");
              }
              if (error?.response?.status == 422) {
                this.alertGuardado(devolucion.det_id, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(devolucion.det_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.devolucionService.actualizar(this.dev_id, devolucion).subscribe(
            response => {
              if (response?.status == 200) {
                this.alertGuardado(
                  response.data.dev_id,
                  `La devolución de ${nombreMedicamento} ha sido actualizada`
                );
              }
            },
            error => {
              if (error?.response?.status == 401) {
                this.alertGuardado(devolucion.det_id, "No tienes permisos para realizar esta acción.", "Error");
              }
              if (error?.response?.status == 422) {
                this.alertGuardado(devolucion.det_id, error?.response?.data[0]?.message, "Error");
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
    const control = this.devolucion.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(dev_cantidad: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Devolución',
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
    this.devolucionService.detalle(this.dev_id).subscribe({
      next: (data) => {
        this.editarDatos = data;
        Object.keys(this.editarDatos).forEach((key: any) => {
          const control = this.devolucion.get(String(key));
          if (control !== null) {
            control.markAsTouched();
            control.patchValue(this.editarDatos[key]);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener detalles de la devolución:', error);
      }
    });
  }

}
