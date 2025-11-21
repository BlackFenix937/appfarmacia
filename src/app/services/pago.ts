import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Pago {
  
      url: string = `${environment.apiUrl}pagos`;
  headers: any = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') /*||  'Bearer 100-token' */ };

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


  detalle(pag_id: number | string | null = null, extra: string = ''): Observable<any> {
    const url = `${this.url}/` + pag_id + extra;
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

  crear(pago: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, pago, {
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

  actualizar(pag_id: number, pago: any): Observable<any> {
    const url = `${this.url}/${pag_id}`;
    return new Observable(observer => {
      axios.put(url, pago, {
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

  eliminar(pag_id: number, pag_monto: string): Observable<any> {
    const url = `${this.url}/${pag_id}`;
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
