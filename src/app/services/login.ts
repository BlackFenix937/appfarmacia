import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Login {
  url: string = `${environment.apiUrl}cliente/`;
  headers: any = { 'Content-Type': 'application/json' };

  login(dataLogin: any): Observable<any> {
    const url = `${this.url}login`;
    return new Observable(observer => {
      axios.post(url, dataLogin, {
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

  registrar(dataRegistrar: any): Observable<any> {
    const url = `${this.url}registrar`;
    return new Observable(observer => {
      axios.post(url, dataRegistrar, {
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

}
