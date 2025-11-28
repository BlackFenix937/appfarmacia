import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Medicamento } from '../services/medicamento';
import { Categoriamedicamento } from '../services/categoriamedicamento';

@Component({
  selector: 'app-categoriamedicamento-crear',
  templateUrl: './categoriamedicamento-crear.page.html',
  styleUrls: ['./categoriamedicamento-crear.page.scss'],
  standalone: false
})
export class CategoriamedicamentoCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private medicamentoService: Medicamento,
    private categmedService: Categoriamedicamento,
  ) { }

  private editarDatos = [];
  @Input() catmed_id: number | undefined;
  public categoriamedicamentos!: FormGroup;
  medicamentos: any = [];

  ngOnInit() {
    this.cargarMedicamentos();
    if (this.catmed_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'med_id': [
      { type: 'required', message: 'El nombre del medicamento es obligatorio.' },
    ],
    'catmed_nombre': [
      { type: 'required', message: 'El nombre de la categoria es obligatoria.' },
    ],
    'catmed_descripcion': [
      { type: 'required', message: 'La descripcion de la categoria es obligatoria.' },
    ],
  }

  private formulario() {
    this.categoriamedicamentos = this.formBuilder.group({
      med_id: ['', [Validators.required]],
      catmed_nombre: ['', [Validators.required]],
      catmed_descripcion: ['', [Validators.required]],
    })
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
          this.medicamentos = response;
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
      const categoria = this.categoriamedicamentos?.value;
      if (this.catmed_id === undefined) {
        try {
          await this.categmedService.crear(categoria).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.catmed_id, 'La categoria ' + categoria.catmed_nombre + ' ha sido registrada.');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(categoria.catmed_id, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(categoria.catmed_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(categoria.catmed_id, "No tienes permisos para realizar esta acción.", "Error")
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.categmedService.actualizar(this.catmed_id, categoria).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.catmed_id, 'La categoria ' + categoria.catmed_nombre + ' ha sido actualizada.');
              }
            },
            error => {
              if (error?.response?.status == 401) {
                this.alertGuardado(categoria.catmed_id, "No tienes permisos para realizar esta acción.", "Error")
              }
              if (error?.response?.status == 422) {
                this.alertGuardado(categoria.catmed_id, error?.response?.data[0]?.message, "Error");
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
    const control = this.categoriamedicamentos.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(catmed_nombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Categoria Medicamento',
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
    this.categmedService.detalle(this.catmed_id).subscribe({
      next: (data) => {
        this.editarDatos = data;
        Object.keys(this.editarDatos).forEach((key: any) => {
          const control = this.categoriamedicamentos.get(String(key));
          if (control !== null) {
            control.markAsTouched();
            control.patchValue(this.editarDatos[key]);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener detalles de la categoria:', error);
      }
    });
  }

}
