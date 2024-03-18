import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { API_GUARNICIONES } from '../entorno/rutas';

@Injectable({
  providedIn: 'root'
})
export class GuarnicionesService {

  constructor(private http:HttpClient) {}

  public getGuarniciones():Observable<Producto[]>{
    return this.http.get<Producto[]>(API_GUARNICIONES)
}

public postGuarnicion(guarnicion:FormData):Observable<FormData>{
  return this.http.post<FormData>(API_GUARNICIONES,guarnicion)
 }

 public putGuarnicion(guarnicion:FormData,id:number):Observable<FormData>{
  guarnicion.append('_method','PUT')
  return this.http.post<FormData>(`${API_GUARNICIONES}/${id}`,guarnicion)
 }

 public deleteGuarnicion(id:number):Observable<string>{
  return this.http.delete<string>(`${API_GUARNICIONES}/${id}`)
 }

}
