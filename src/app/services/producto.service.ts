import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../models/producto';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseEndPoint = 'http://localhost:8080/products'

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.cabeceras.append('Authorization', 'Bearer ' + token);
    }
    return this.cabeceras;
  }

  private isNoAuthorizado(e): boolean{
    if(e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  /*public listar(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseEndPoint);
  }*/

  public listarProductos(page: string, size:string): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.baseEndPoint}/paginador`, {params: params, headers: this.agregarAuthorizationHeader() })
    .pipe(catchError(e => {
      this.isNoAuthorizado(e);
      return throwError(e);
    }));
  }
}
