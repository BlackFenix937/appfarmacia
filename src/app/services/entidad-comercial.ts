import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EntidadComercial {
  url: string = `${environment.apiUrl}entidadcomercials`;
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

//detalle
detalle(ent_id:string | null = '', extra:string = '?expand=ciudadNombre'): Observable<any> {
    const url = `${this.url}/`+ent_id+extra;
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

//crear
crear(entidadcomercial: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, entidadcomercial, {
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

//actualizar
actualizar(ent_id:number, entidadcomercial: any): Observable<any> {
    const url = `${this.url}/${ent_id}`;
    return new Observable(observer => {
      axios.put(url, entidadcomercial, {
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

//eliminar
eliminar(ent_id: number, ent_nombre:string): Observable<any> {
    const url = `${this.url}/${ent_id}`;
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

//total
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
