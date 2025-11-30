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
  public iva: number = 0;
  public totalFactura: number = 0;

  ngOnInit() {
    this.cargarCompra();
    this.formulario();
  }

  mensajes_validacion: any = {
    'comp_id': [
      { type: 'required', message: 'Es obligatorio cargar la compra.' },
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
    const fechaActual = new Date().toISOString().split('T')[0];
    this.pagos = this.formBuilder.group({
      comp_id: ['', [Validators.required]],
      pag_monto: ['', [Validators.required]],
      pag_factura_solicitada: [0, [Validators.required]],
      pag_fecha: [fechaActual, [Validators.required]],
      pag_fkestado_id: ['8', [Validators.required]],
    });
    this.pagos.get('pag_fecha')?.disable();
  }

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

  calcularIVA() {
    const subtotal = parseFloat(this.selectedCompra.comp_total);
    this.iva = subtotal * 0.16;
    this.totalFactura = subtotal + this.iva;

    console.log(`Subtotal: ${subtotal}, IVA: ${this.iva}, Total: ${this.totalFactura}`);

    this.pagos.patchValue({
      pag_monto: subtotal,
    });
  }

  onCompraChange(event: any) {
    const selectedCompraId = event.target.value;
    this.selectedCompra = this.compras.find((compra: any) => compra.comp_id === selectedCompraId);

    if (this.selectedCompra) {

      this.calcularIVA();
    }
  }

  generarFolio(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `FAC${año}${mes}${dia}`;
  }

  async guardarDatos() {
    const pago = this.pagos?.value;

    if (this.selectedCompra === undefined || !this.selectedCompra.comp_total || pago.pag_monto <= 0) {
      this.alertGuardado('', 'El monto de pago no puede ser cero o vacío.', 'Error');
      return;
    }

    try {
      const pagoResponse = await this.pagoService.crear(pago).toPromise();
      const pagoId = pagoResponse?.data?.pag_id;

      if (pagoId) {

        if (pago.pag_factura_solicitada === 1) {

          const fac_folio = this.generarFolio();

          const factura = {
            pag_id: pagoId,
            fac_folio: fac_folio,
            fac_fecha_emision: new Date().toISOString().split('T')[0],
            fac_subtotal: this.selectedCompra.comp_total,
            fac_impuestos: this.iva,
            fac_total: this.totalFactura,
            fac_fkestado_id: 9,
          };

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
