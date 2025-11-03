import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Ciudad {
  
  url: string = `${environment.apiUrl}ciudads`;
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

//detalle de elemento

detalle(ciu_id:string | null ='', extra:string ='?expand=municipioNombre'): Observable<any> {
    const url = `${this.url}/`+ciu_id+extra;
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


//crear elemento

crear(ciudad: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, ciudad, {
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


//actualizar elemento
actualizar(ciu_id:number, ciudad:any): Observable<any> {
    const url = `${this.url}/${ciu_id}`;
    return new Observable(observer => {
      axios.put(url, ciudad, {
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

//eliminar elemento
eliminar(ciu_id: number, ciu_nombre:string): Observable<any> {
    const url = `${this.url}/${ciu_id}`;
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

