import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Compra } from '../services/compra';
import { Pago } from '../services/pago';
import { Factura } from '../services/factura';

@Component({
  selector: 'app-pago-crear',
  templateUrl: './pago-crear.page.html',
  styleUrls: ['./pago-crear.page.scss'],
  standalone: false,
})
export class PagoCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private compraService: Compra,
    private pagoService: Pago,
    private facturaService: Factura
  ) { }

  @Input() pag_id: number | undefined;
  public pagos!: FormGroup;
  compras: any = [];
  public selectedCompra: any;
  public iva: number = 0;  // Variable para almacenar el IVA
  public totalFactura: number = 0;  // Total de la factura (subtotal + IVA)

  ngOnInit() {
    this.cargarCompra();
    this.formulario();
  }

  mensajes_validacion: any = {
    'comp_id': [
      { type: 'required', message: 'Cargar la compra es obligatorio.' },
    ],
    'pag_monto': [
      { type: 'required', message: 'El monto es obligatorio.' },
    ],
    'pag_fecha': [
      { type: 'required', message: 'La fecha es obligatoria.' },
    ],
    'pag_factura_solicitada': [
      { type: 'required', message: 'Es obligatorio elegir si desea factura o no.' }
    ],
  }

  private formulario() {
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato yyyy-MM-dd
    this.pagos = this.formBuilder.group({
      comp_id: ['', [Validators.required]],
      pag_monto: ['', [Validators.required]],
      pag_factura_solicitada: [0, [Validators.required]],
      pag_fecha: [fechaActual, [Validators.required]],
      pag_fkestado_id: ['8', [Validators.required]],
    });
    this.pagos.get('pag_fecha')?.disable();  // Deshabilitamos el campo pag_fecha
  }

  // Cargar las compras
  async cargarCompra() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.compraService.listado('?expand=medicamentoNombre').subscribe(
        response => {
          this.compras = response;
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

  // Función para calcular el IVA y el total solo cuando se haga clic en guardar
  // Función para calcular el IVA y el total correctamente
  calcularIVA() {
    const subtotal = parseFloat(this.selectedCompra.comp_total);  // Subtotal de la compra, asegurando que sea un número
    this.iva = subtotal * 0.16;  // 16% de IVA
    this.totalFactura = subtotal + this.iva;  // Total = Subtotal + IVA

    // Asegurarse de que el total se está calculando correctamente
    console.log(`Subtotal: ${subtotal}, IVA: ${this.iva}, Total: ${this.totalFactura}`);

    // Actualizar el campo de monto de pago para que coincida con el subtotal
    this.pagos.patchValue({
      pag_monto: subtotal,  // El monto del pago es igual al subtotal
    });
  }

  // Método para manejar el cambio de compra seleccionada
  onCompraChange(event: any) {
    const selectedCompraId = event.target.value; // ID de la compra seleccionada
    this.selectedCompra = this.compras.find((compra: any) => compra.comp_id === selectedCompraId);

    if (this.selectedCompra) {
      // Solo se calcula el IVA y se muestra el subtotal al seleccionar la compra
      this.calcularIVA();
    }
  }

  // Método para generar el folio de la factura (FAC + fecha)
  generarFolio(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Asegura que el mes sea siempre de 2 dígitos
    const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura que el día sea siempre de 2 dígitos
    return `FAC${año}${mes}${dia}`;
  }

  // Método para guardar los datos de pago y factura
async guardarDatos() {
  const pago = this.pagos?.value;

  // Verificar que el monto sea válido
  if (this.selectedCompra === undefined || !this.selectedCompra.comp_total || pago.pag_monto <= 0) {
    this.alertGuardado('', 'El monto de pago no puede ser cero o vacío.', 'Error');
    return;
  }

  // Primero, crear el pago en el sistema
  try {
    const pagoResponse = await this.pagoService.crear(pago).toPromise();
    const pagoId = pagoResponse?.data?.pag_id;  // Obtener el pag_id del pago recién creado

    // Si el pago se creó correctamente, proceder con el siguiente paso
    if (pagoId) {
      // Verificar si la factura fue solicitada
      if (pago.pag_factura_solicitada === 1) {
        // Generar el folio de la factura
        const fac_folio = this.generarFolio();

        // Crear la factura con los valores calculados
        const factura = {
          pag_id: pagoId,   // Usamos el pag_id del pago recién creado
          fac_folio: fac_folio,  // Folio generado
          fac_fecha_emision: new Date().toISOString().split('T')[0], // Fecha actual
          fac_subtotal: this.selectedCompra.comp_total,  // Subtotal
          fac_impuestos: this.iva,  // IVA
          fac_total: this.totalFactura,  // Total después de impuestos
          fac_fkestado_id: 9,  // Estado de la factura, siempre 9
        };

        // Crear la factura en el backend
        await this.facturaService.crear(factura).subscribe(
          response => {
            console.log('Factura creada:', response);
            this.alertGuardado(response.data.pag_id, 'Factura generada y pago registrado.');
          },
          error => {
            console.error('Error al crear factura:', error);
            this.alertGuardado('', 'Hubo un error al crear la factura.', 'Error');
          }
        );
      } else {
        // Si no se solicitó factura, simplemente mostrar el mensaje
        this.alertGuardado(pagoId, 'El pago ha sido registrado sin factura.');
      }
    } else {
      console.error('Error: El pago no fue creado correctamente');
      this.alertGuardado('', 'Hubo un error al crear el pago.', 'Error');
    }
  } catch (error) {
    console.log('Error al guardar el pago:', error);
    this.alertGuardado('', 'Hubo un error al guardar el pago.', 'Error');
  }
}


  // Función para mostrar una alerta después de guardar
  private async alertGuardado(compra: number | string, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Pago',
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
    const control = this.pagos.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

}
