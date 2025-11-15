import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Cliente } from '../services/cliente';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.page.html',
  styleUrls: ['./cliente-detalle.page.scss'],
  standalone: false,
})
export class ClienteDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private clientesService: Cliente,
    private location: Location
  ) { }

  cliente: any = null;

  ngOnInit(): void {
    this.cargarCliente();
  }

  async cargarCliente() {
    const cli_id = this.route.snapshot.paramMap.get('cli_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.clientesService.detalle(cli_id, '?expand=ciudadNombre,municipioNombre, estadoNombre').subscribe(
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

  goBack() {
    this.location.back();
  }

}
