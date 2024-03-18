import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from 'src/app/servicios/pedidos.service';


@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent {

  public pedido:Pedido;

  constructor(private servicioPedidos:PedidosService,private ruta:ActivatedRoute){

      this.pedido={
        id:0,
        nombre_cliente:"",
        comentario:"",
        hora_pedido:new Date,
        idhamburguesa:0,
        hamburguesa:"",
        hamburguesaCoste:0,
        idguarnicion:0,
        guarnicion:"",
        guarnicionCoste:0,
        idbebida:0,
        bebida:"",
        bebidaCoste:0,
        tiempo_transcurrido: "",
        precioTotal:0
      }
  }

  ngOnInit(){

    this.ruta.params.subscribe(params=>{
      console.log(params)
       this.servicioPedidos.getPedido(params['id']).subscribe({
         next:(pedido)=>{
            console.log(pedido);
            this.pedido=pedido;
            },

         error:(error)=>{
          console.log('Error de respuesta'+ error.error)
        }
       })
    })


  }
}
