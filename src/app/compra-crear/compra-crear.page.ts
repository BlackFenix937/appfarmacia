import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Compra } from '../services/compra';
import { Cliente } from '../services/cliente';
import { Compradetalle } from '../services/compradetalle';
import { Medicamento } from '../services/medicamento';

@Component({
  selector: 'app-compra-crear',
  templateUrl: './compra-crear.page.html',
  styleUrls: ['./compra-crear.page.scss'],
  standalone: false
})
export class CompraCrearPage implements OnInit {

  @Input() comp_id: number | undefined;
  public compra!: FormGroup;
  cliente: any = [];
  medicamentos: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private clienteService: Cliente,
    private compraService: Compra,
    private compradetalleService: Compradetalle,
    private medicamentoService: Medicamento,
  ) { }

  ngOnInit() {
    this.cargarClientes();
    this.cargarMedicamentos();
    this.formulario();
  }

  // Crear el formulario con los campos necesarios
  private formulario() {
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato yyyy-MM-dd
    this.compra = this.formBuilder.group({
      cli_id: ['', [Validators.required]],
      comp_fecha: [fechaActual, [Validators.required]],
      comp_total: ['', [Validators.required]],  // Campo deshabilitado
      comp_fkestado_id: ['3', [Validators.required]],
      medicamentos: this.formBuilder.array([])  // FormArray para los medicamentos
    });
    this.compra.get('comp_fecha')?.disable();  // Deshabilitamos el campo comp_fecha
  }

  // Getter para acceder al FormArray de medicamentos
  get medicamentosFA(): FormArray {
    return this.compra.get('medicamentos') as FormArray;
  }

  // Método para agregar un medicamento al FormArray
  agregarMedicamento() {
    this.medicamentosFA.push(
      this.formBuilder.group({
        med_id: ['', [Validators.required]], // Medicamento
        det_cantidad: ['', [Validators.required, Validators.min(1)]], // Cantidad
        det_precio_unitario: [{ value: '', disabled: true }, [Validators.required]], // Precio unitario (Deshabilitado, se obtiene del medicamento)
        det_subtotal: [{ value: '', disabled: true }, [Validators.required]]  // Subtotal (calculado)
      })
    );
  }

  // Método para eliminar un medicamento del FormArray
  eliminarMedicamento(index: number) {
    this.medicamentosFA.removeAt(index);
    // Recalcular total después de eliminar medicamento
    this.calcularTotal();
  }

  // Método para cargar los clientes
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

  // Método para cargar los medicamentos
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

  // Método para calcular el subtotal cuando cambian los valores de cantidad o precio unitario
  calcularSubtotal(index: number) {
    const cantidad = this.medicamentosFA.at(index).get('det_cantidad')?.value;
    const precioUnitario = this.medicamentosFA.at(index).get('det_precio_unitario')?.value;
    const subtotal = cantidad * precioUnitario;
    // Actualizamos el valor del subtotal en el FormArray
    this.medicamentosFA.at(index).get('det_subtotal')?.setValue(subtotal);
    // Recalculamos el total
    this.calcularTotal();
  }

  // Método para actualizar el precio unitario al seleccionar un medicamento
  actualizarPrecioUnitario(index: number) {
    const medicamentoId = this.medicamentosFA.at(index).get('med_id')?.value;
    const medicamento = this.medicamentos.find((med: any) => med.med_id === medicamentoId);

    if (medicamento) {
      const precioUnitario = medicamento.med_precio_unitario;
      // Aquí actualizamos correctamente el precio unitario en el FormArray
      this.medicamentosFA.at(index).get('det_precio_unitario')?.setValue(precioUnitario);

      // Calculamos el subtotal con la cantidad actual
      this.calcularSubtotal(index);
    }
  }

  // Método para calcular el total de la compra
  calcularTotal() {
    let total = 0;

    // Sumamos los subtotales de todos los medicamentos
    this.medicamentosFA.controls.forEach(control => {
      const subtotal = control.get('det_subtotal')?.value || 0;
      total += subtotal;
    });

    // Mostramos el total calculado en consola
    console.log('Total calculado:', total);

    // Actualizamos el total de la compra solo si es mayor a 0
    if (total > 0) {
      this.compra.get('comp_total')?.setValue(total);  // Aquí lo actualizamos
    } else {
      this.compra.get('comp_total')?.setValue(0); // Si el total es 0, lo dejamos en 0
    }
  }

  // Método para guardar la compra
  async guardarDatos() {
    try {

      // Calcular el total antes de enviar los datos
      this.calcularTotal();

      const compra = this.compra?.value;

      // Verificar si comp_total tiene un valor válido
      if (compra.comp_total === null || compra.comp_total === undefined || compra.comp_total === 0) {
        this.alertGuardado('', 'El total de la compra no puede estar vacío o ser cero', 'Error');
        return;
      }

      // Validar los detalles de los medicamentos
      if (this.medicamentosFA.length === 0) {
        this.alertGuardado('', 'Debe agregar al menos un medicamento a la compra', 'Error');
        return;
      }

      // Verificar que cada medicamento tenga los campos completos
      for (let i = 0; i < this.medicamentosFA.length; i++) {
        const medicamento = this.medicamentosFA.at(i);
        if (!medicamento.get('med_id')?.value || !medicamento.get('det_cantidad')?.value || !medicamento.get('det_precio_unitario')?.value) {
          this.alertGuardado('', 'Hay campos faltantes o incorrectos en los detalles de la compra', 'Error');
          return;
        }
      }

      // Habilitar comp_total temporalmente antes de enviarlo al backend
      this.compra.get('comp_total')?.enable();

      // Asegurarse de que comp_total esté presente
      console.log('Datos de la compra antes de enviar:', compra);

      if (this.comp_id === undefined) {
        // Crear una nueva compra
        try {
          await this.compraService.crear(compra).subscribe(
            response => {
              if (response?.status == 201) {
                const compraId = response.data.comp_id;
                this.guardarDetalles(compraId, compra.medicamentos); // Guardar detalles
                this.alertGuardado(compraId, 'La compra ha sido registrada');
              }
            },
            error => {
              this.handleError(error);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        // Actualizar compra existente
        try {
          await this.compraService.actualizar(this.comp_id, compra).subscribe(
            response => {
              if (response?.status == 200) {
                this.alertGuardado(compra.comp_id, 'La compra ha sido actualizada');
              }
            },
            error => {
              this.handleError(error);
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

  // Método para guardar los detalles de la compra
  private guardarDetalles(compraId: number, medicamentos: any[]) {
    medicamentos.forEach((medicamento: any, index: number) => {
      const formMedicamento = this.medicamentosFA.at(index);
      const compradetalle = {
        comp_id: compraId,
        med_id: medicamento.med_id,
        det_cantidad: medicamento.det_cantidad,
        det_precio_unitario: formMedicamento.get('det_precio_unitario')?.value,
        det_subtotal: formMedicamento.get('det_subtotal')?.value
      };

      console.log('Detalle a guardar:', compradetalle);

      this.compradetalleService.crear(compradetalle).subscribe(
        response => console.log('Detalle guardado', response),
        error => console.error('Error al guardar detalle', error)
      );

    });
  }

  // Función para manejar errores
  private handleError(error: any) {
    if (error?.response?.status == 422) {
      // Mostrar detalles específicos del error
      console.log('Detalles del error:', error.response.data);
      this.alertGuardado('', error?.response?.data[0]?.message, "Error");
    } else if (error?.response?.status == 500) {
      this.alertGuardado('', "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
    } else if (error?.response?.status == 401) {
      this.alertGuardado('', "No tienes permisos para realizar esta acción.", "Error");
    }
  }

  // Función para mostrar alertas de guardado
  private async alertGuardado(compra: number | string, msg = "", subMsg = "Guardado") {
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
}
