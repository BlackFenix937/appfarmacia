import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Compradetalle {
  url: string = `${environment.apiUrl}compradetalles`;
  headers: any = { 'Content-Type': 'application/json', 'Authorization': /*'Bearer ' + localStorage.getItem('token') || */ 'Bearer 100-token'  };

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


  detalle(det_id: number | string | null = null, extra: string = ''): Observable<any> {
    const url = `${this.url}/` + det_id + extra;
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

  crear(compradetalle: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, compradetalle, {
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

  actualizar(det_id: number, compradetalle: any): Observable<any> {
    const url = `${this.url}/${det_id}`;
    return new Observable(observer => {
      axios.put(url, compradetalle, {
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

  eliminar(det_id: number, compradetalle: string): Observable<any> {
    const url = `${this.url}/${det_id}`;
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
