import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent {

  public pedido:Pedido;
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];

  constructor(private servicioPedido:PedidosService, private servicioHamburguesas:HamburguesasService, private servicioGuarniciones:GuarnicionesService, private servicioBebidas:BebidasService){

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

   public nuevoPedido(formulario:NgForm){

    console.log(this.pedido)

    let formData=new FormData();

    formData.append('nombre_cliente',this.pedido.nombre_cliente)
    formData.append('comentario',this.pedido.comentario)
    formData.append('idhamburguesa', this.pedido.idhamburguesa.toString());
    formData.append('idguarnicion', this.pedido.idguarnicion ? this.pedido.idguarnicion.toString() : '');
    formData.append('idbebida', this.pedido.idbebida ? this.pedido.idbebida.toString() : '');

    this.servicioPedido.postPedido(formData).subscribe({
      next:((pedido)=>{
        console.log(this.pedido)
        alert("Pedido realizado")
        formulario.reset()
      }),
      error:((error)=>{alert(error.error);console.log(error)})
    })

   }


   ngOnInit(){

    this.servicioHamburguesas.getHamburguesas().subscribe({
      next:(hamburguesas=>{
        this.hamburguesas=hamburguesas
      }),
      error:(error=>{
        console.log('Error de respuesta'+ error.error)
      })
    })

    this.servicioGuarniciones.getGuarniciones().subscribe({
      next:(guarniciones=>{
        this.guarniciones=guarniciones
      }),
      error:(error=>{
        console.log('Error de respuesta'+ error.error)
      })
    })

    this.servicioBebidas.getBebidas().subscribe({
      next:(bebidas=>{
        this.bebidas=bebidas
      }),
      error:(error=>{
        console.log('Error de respuesta'+ error.error)
      })
    })
   }
  }


