import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent {

  public pedidos: Pedido[];
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];


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

  ngOnInit() {

    this.servicioPedidos.getPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos.map(pedido => {
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



