import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}

  enlaces:any = [
    { ruta: '/cliente', texto: 'Clientes' },
    { ruta: '/medicamento', texto: 'Medicamentos' },
    { ruta: '/entidad-comercial', texto: 'Entidad comercial' },
    { ruta: '/entidad-medicamento', texto: 'Entidad medicamento' },
    { ruta: '/tabs/tab1/siguiente', texto: 'Siguiente' }
];

}
