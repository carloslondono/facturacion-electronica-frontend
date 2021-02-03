import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseEndPoint = 'http://localhost:8080/clients'

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

  public listar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(catchError(e => {
      this.isNoAuthorizado(e);
      return throwError(e);
    }));
  }

  public ver(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.baseEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(catchError(e => {
      this.isNoAuthorizado(e);
      return throwError(e);
    }));
  }
}
