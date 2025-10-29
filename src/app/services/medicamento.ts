import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Medicamento {
  url: string = `${environment.apiUrl}clientes`;
  headers: any = { 'Content-Type': 'application/json', 'Authorization':/* 'Bearer '+localStorage.getItem('token') || aún no se usa */ 'Bearer 100-token' };
  
  //listado
  listado(extra: string = '', busqueda:string=''): Observable<any> {
    let url:string = '';
    if(busqueda === '') {
        url = `${this.url}`+extra;
    } else {
        url = `${this.url}/buscar/`+busqueda+extra;
    }
    return new Observable(observer => {
        axios.get(url, {
            withCredentials: true,
            headers: this.headers
        })
        .then(response => {
            observer.next(response.data);
            observer.complete();
        })
        .catch(error => {
            observer.error(error);
            observer.complete();
        });
    });
}


  
}
