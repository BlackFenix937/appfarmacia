import { Component, input, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false,
})
export class ToolbarComponent implements OnInit {

  constructor(

    private router: Router

  ) { }

  ngOnInit() { }

  @Input('nombre') nombre: string | undefined;
  @Input('color') color: string = "primario";

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
