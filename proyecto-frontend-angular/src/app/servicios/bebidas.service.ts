import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { API_BEBIDAS } from '../entorno/rutas';

@Injectable({
  providedIn: 'root'
})
export class BebidasService {

  constructor(private http:HttpClient) { }

  public getBebidas():Observable<Producto[]>{
    return this.http.get<Producto[]>(API_BEBIDAS)
}

public postBebida(bebida:FormData):Observable<FormData>{
  return this.http.post<FormData>(API_BEBIDAS,bebida)
 }

 public putBebida(bebida:FormData,id:number):Observable<FormData>{
  bebida.append('_method','PUT')
  return this.http.post<FormData>(`${API_BEBIDAS}/${id}`,bebida)
 }

 public deleteBebida(id:number):Observable<string>{
  return this.http.delete<string>(`${API_BEBIDAS}/${id}`)
 }

}
