import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Permiso {

  url:string  = `${environment.apiUrl}permiso/`;
headers:any = {'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token')};

permisos(): Observable<any> {
    const url = `${this.url}lista-permisos?user=${localStorage.getItem('token')}`;
    return new Observable(observer => {
      axios.get(url, {
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

has(vista: string): boolean {
    const permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    return permisos.includes(vista);
}

  
}
