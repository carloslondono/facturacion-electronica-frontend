import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseEndPoint = 'http://localhost:8080/products'
  private token = 'Beare ';

  constructor(private http: HttpClient) {}

  public listar(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseEndPoint)
  }
}
