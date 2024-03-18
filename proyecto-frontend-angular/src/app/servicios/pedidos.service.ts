import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { API_PEDIDOS } from '../entorno/rutas';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http:HttpClient) {}

   public getPedidos():Observable<Pedido[]>{
      return this.http.get<Pedido[]>(API_PEDIDOS)
   }

   public getPedido(id:number):Observable<Pedido>{
    return this.http.get<Pedido>(`${API_PEDIDOS}/${id}`)
   }

   public postPedido(pedido:FormData):Observable<FormData>{
    return this.http.post<FormData>(API_PEDIDOS,pedido)
   }

   public putPedido(pedido:FormData,id:number):Observable<FormData>{
    pedido.append('_method','PUT')
    return this.http.post<FormData>(`${API_PEDIDOS}/${id}`,pedido)
   }

   public deletePedido(id:number):Observable<string>{
    return this.http.delete<string>(`${API_PEDIDOS}/${id}`)
   }
}
