import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { API_HAMBURGUESAS } from '../entorno/rutas';

@Injectable({
  providedIn: 'root'
})
export class HamburguesasService {

  constructor(private http:HttpClient) { }

  public getHamburguesas():Observable<Producto[]>{
    return this.http.get<Producto[]>(API_HAMBURGUESAS)
 }

 public postHamburguesa(hamburguesa:FormData):Observable<FormData>{
  return this.http.post<FormData>(API_HAMBURGUESAS,hamburguesa)
 }

 public putHamburguesa(hamburguesa:FormData,id:number):Observable<FormData>{
  hamburguesa.append('_method','PUT')
  return this.http.post<FormData>(`${API_HAMBURGUESAS}/${id}`,hamburguesa)
 }

 public deleteHamburguesa(id:number):Observable<string>{
  return this.http.delete<string>(`${API_HAMBURGUESAS}/${id}`)
 }


}
