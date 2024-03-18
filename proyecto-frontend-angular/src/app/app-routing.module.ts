import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/hamburguer/inicio/inicio.component';
import { NuevoPedidoComponent } from './components/hamburguer/nuevo-pedido/nuevo-pedido.component';
import { PedidosComponent } from './components/hamburguer/pedidos/pedidos.component';
import { PedidosMtoComponent } from './components/hamburguer/pedidos-mto/pedidos-mto.component';
import { DetallePedidoComponent } from './components/hamburguer/detalle-pedido/detalle-pedido.component';
import { MenuMtoComponent } from './components/hamburguer/menu-mto/menu-mto.component';
import { GestionPedidosComponent } from './components/hamburguer/gestion-pedidos/gestion-pedidos.component';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'nuevo_pedido', component:NuevoPedidoComponent},
  {path:'pedidos', component:PedidosComponent},
  {path:'mantenimiento_pedido/:id', component:PedidosMtoComponent},
  {path:'detalle_pedido/:id', component:DetallePedidoComponent},
  {path:'gestion_pedidos', component:GestionPedidosComponent},
  {path:'mantenimiento_menu', component:MenuMtoComponent},
  {path:'**', pathMatch:'full', redirectTo:'inicio'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
