import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Pago } from '../services/pago';
import { Factura } from '../services/factura';

@Component({
  selector: 'app-factura-crear',
  templateUrl: './factura-crear.page.html',
  styleUrls: ['./factura-crear.page.scss'],
  standalone: false,
})
export class FacturaCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private pagoService: Pago,
    private facturaService: Factura,
  ) { }

  private editarDatos = [];
  @Input() fac_id: number | undefined;
  public facturas!: FormGroup;
  pagos: any = [];

  ngOnInit() {
  }

    mensajes_validacion: any = {
    'pag_id': [
      { type: 'required', message: 'Cargar el pago es obligatorio.' },
    ],
  }

}
