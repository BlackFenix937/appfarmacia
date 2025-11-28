import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Tipoestado {
  
  url: string = `${environment.apiUrl}tipoestados`;
  headers: any = { 'Content-Type': 'application/json', 'Authorization':'Bearer '+localStorage.getItem('token')};

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

//detalle de elemento
detalle(test_id:string | number| null ='', extra:string =''): Observable<any> {
    const url = `${this.url}/`+test_id+extra;
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

//total de elementos
total(busqueda:string=''): Observable<any> {
    const url = `${this.url}/total/`+busqueda; 
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
