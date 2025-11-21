import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Compra } from '../services/compra';

@Component({
  selector: 'app-compra-detalle',
  templateUrl: './compra-detalle.page.html',
  styleUrls: ['./compra-detalle.page.scss'],
  standalone: false,
})
export class CompraDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private location: Location,
    private compraService: Compra
  ) { }

  compra: any = null;

  ngOnInit(): void {
    this.cargarCompra();
  }

  async cargarCompra() {
    const comp_id = this.route.snapshot.paramMap.get('comp_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.compraService.detalle(comp_id, '?expand=clienteNombre,estadoCompra,compraDetalle').subscribe(
        response => {
          this.compra = response;
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

  goBack() {
    this.location.back();
  }

}
