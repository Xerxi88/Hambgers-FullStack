import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';

@Component({
  selector: 'app-pedidos-mto',
  templateUrl: './pedidos-mto.component.html',
  styleUrls: ['./pedidos-mto.component.css']
})
export class PedidosMtoComponent {

  public pedido:Pedido;
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];

  constructor(private servicioPedidos:PedidosService, private servicioHamburguesas:HamburguesasService, private servicioGuarniciones:GuarnicionesService,private servicioBebidas:BebidasService,private ruta:ActivatedRoute, private router:Router){

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

    this.hamburguesas=[];
    this.guarniciones=[];
    this.bebidas=[];
}

public modificarPedido(){
  console.log(this.pedido)

    let formData=new FormData();

    formData.append('comentario',this.pedido.comentario)
    formData.append('idhamburguesa', this.pedido.idhamburguesa.toString());
    formData.append('idguarnicion', this.pedido.idguarnicion ? this.pedido.idguarnicion.toString() : '');
    formData.append('idbebida', this.pedido.idbebida ? this.pedido.idbebida.toString() : '');

    this.servicioPedidos.putPedido(formData,this.pedido.id).subscribe({
      next:((pedido)=>{
        console.log(this.pedido)
        alert("Pedido modificado")
      }),
      error:((error)=>{alert(error.error);console.log(error)})
    })
}

public borrarPedido(){

  if(confirm("Estas seguro de querer eliminar este pedido?")){
    this.servicioPedidos.deletePedido(this.pedido.id).subscribe({
      next:((mensaje)=>{alert("Pedido eliminado")
      this.router.navigate(['/gestion_pedidos'])
    }),
    error:((error)=>{alert(error.error)})
    })}
}

ngOnInit(){

  this.servicioHamburguesas.getHamburguesas().subscribe({
     next:(hamburguesas)=>{
       this.hamburguesas=hamburguesas;
     },
     error:(error)=>{
       alert('Error de respuesta' + error.error)
     }
   })

   this.servicioGuarniciones.getGuarniciones().subscribe({
     next:(guarniciones)=>{
       this.guarniciones=guarniciones;
     },
     error:(error)=>{
       alert('Error de respuesta' + error.error)
     }
   })

   this.servicioBebidas.getBebidas().subscribe({
     next:(bebidas)=>{
       this.bebidas=bebidas;
     },
     error:(error)=>{
       alert('Error de respuesta' + error.error)
     }
   })


  this.ruta.params.subscribe(params=>{
      console.log(params['id'])
       this.servicioPedidos.getPedido(params['id']).subscribe({
         next:(pedido)=>{
            this.pedido=pedido;
            },

         error:(error)=>{
          console.log('Error de respuesta'+ error.error)
        }
       })
    })
}

}
