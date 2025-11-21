import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Compradetalle } from '../services/compradetalle';

@Component({
  selector: 'app-compradetalle',
  templateUrl: './compradetalle.page.html',
  styleUrls: ['./compradetalle.page.scss'],
  standalone: false
})
export class CompradetallePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private compradetService: Compradetalle
  ) { }

  compradetalles:any=[];
    total: number = 0;
  page: string = "1";
  busqueda: string = '';

  ngOnInit() {
    this.cargarCompraDetalle();
  }

    async cargarCompraDetalle() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.compradetService.listado('?page=' + this.page+"&expand=medicamentoNombre", this.busqueda).subscribe(
        response => {
          this.compradetalles = response;
          this.cargarTotal();
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

/*  async cargarCompraDetalle (event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
        method: 'get',
        url: "http://localhost:8080/compradetalles?expand=medicamentoNombre",
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        this.compradetalles = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
}*/

 async cargarTotal() {
    try {
      await this.compradetService.total(this.busqueda).subscribe(
        response => {
          this.total = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarCompraDetalle();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarCompraDetalle();
  }



}
