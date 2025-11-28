import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Componente {

  url: string = `${environment.apiUrl}componentes`;
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') /*||  'Bearer 100-token' */ };

  //listado de un elemento
  listado(extra: string = '', busqueda: string = ''): Observable<any> {
    let url: string = '';
    if (busqueda === '') {
      url = `${this.url}` + extra;
    } else {
      url = `${this.url}/buscar/` + busqueda + extra;
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

  //detalle del elemento
  detalle(comp_id: number | string | null = null, extra: string = ''): Observable<any> {
    const url = `${this.url}/` + comp_id + extra;
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

  //creación de un elemento
  crear(componente: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, componente, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  //actualización de un elemento
  actualizar(comp_id: number, componente: any): Observable<any> {
    const url = `${this.url}/${comp_id}`;
    return new Observable(observer => {
      axios.put(url, componente, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  //eliminación de un elemento
  eliminar(comp_id: number, comp_nombre: string): Observable<any> {
    const url = `${this.url}/${comp_id}`;
    return new Observable(observer => {
      axios.delete(url, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  //total de un elemento
  total(busqueda: string = ''): Observable<any> {
    const url = `${this.url}/total/` + busqueda;
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
