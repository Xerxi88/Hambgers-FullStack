import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';
import { interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {

  public pedidos: Pedido[];
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];
  private subscription!: Subscription;

  constructor(private servicioPedidos: PedidosService, private servicioHamburguesas:HamburguesasService,private servicioGuarniciones:GuarnicionesService,private servicioBebidas:BebidasService) {

      this.servicioPedidos.getPedidos().subscribe({
        next:(pedidos)=>{
          this.pedidos=pedidos
        },
        error: (error) => {
          alert('Error de respuesta' + error.error);
        }
      })


    this.pedidos=[]
    this.hamburguesas=[];
    this.guarniciones=[];
    this.bebidas=[];
  }

public borrarPedido(id:number){

    if(confirm("Estas seguro de querer eliminar este pedido?")){
      this.servicioPedidos.deletePedido(id).subscribe({
        next:((mensaje)=>{alert("Pedido eliminado")
      }),
      error:((error)=>{alert(error.error)})
      })}
  }

  ngOnInit() {
    this.obtenerPedidos();

    this.subscription = interval(5000).subscribe(() => {
      this.obtenerPedidos();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  obtenerPedidos() {
     this.servicioPedidos.getPedidos().subscribe({
     next: (pedidos) => {
       this.pedidos = pedidos.map(pedido => {
         const horaPedido = new Date(pedido.hora_pedido);
         const horaActual = new Date();
         const diferenciaMs = horaActual.getTime() - horaPedido.getTime();
         const minutosTranscurridos = Math.floor(diferenciaMs / 60000);
         const segundosTranscurridos = Math.floor((diferenciaMs % 60000) / 1000);
         const segundosFormateados = segundosTranscurridos.toString().padStart(2, '0');
         pedido.tiempo_transcurrido = `${minutosTranscurridos}m:${segundosFormateados}s`;

         const hamburguesaAsociada = this.hamburguesas.find(hamburguesa => hamburguesa.id === pedido.idhamburguesa);
         pedido.hamburguesa = hamburguesaAsociada ? hamburguesaAsociada.nombre : null;

         const guarnicionAsociada = this.guarniciones.find(guarniciones => guarniciones.id === pedido.idguarnicion);
         pedido.guarnicion = guarnicionAsociada ? guarnicionAsociada.nombre : null;

         const bebidaAsociada = this.bebidas.find(bebidas => bebidas.id === pedido.idbebida);
         pedido.bebida = bebidaAsociada ? bebidaAsociada.nombre : null;
           return pedido;
         });
       },
       error: (error) => {
         alert('Error de respuesta' + error.error);
       }
     })

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
  }
}
