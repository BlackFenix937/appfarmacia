import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() { }

  enlaces: any = [
    { ruta: '/categoriamedicamento', texto: 'Categoria de los medicamentos' },
    { ruta: '/ciudad', texto: 'Ciudad' },
    { ruta: '/cliente', texto: 'Clientes' },
    { ruta: '/componente', texto: 'Componentes' },
    { ruta: '/compra', texto: 'Compra' },
    { ruta: '/compradetalle', texto: 'Compra Detalle (Vista)' },
    { ruta: '/devolucion', texto: 'Devolucion' },
    { ruta: '/entidad-comercial', texto: 'Entidad comercial' },
    { ruta: '/entidad-medicamento', texto: 'Entidad medicamento' },
    { ruta: '/estado', texto: 'Estado' },
    { ruta: '/factura', texto: 'Factura' },
    { ruta: '/medicamento', texto: 'Medicamentos' },
    { ruta: '/medicamentocomponente', texto: 'Medicamento Componente' },
    { ruta: '/municipio', texto: 'Municipio' },
    { ruta: '/pago', texto: 'Pago' },
    { ruta: '/pais', texto: 'País' },
    { ruta: '/tipo-estado', texto: 'Tipos de estados' },
  ];

}
