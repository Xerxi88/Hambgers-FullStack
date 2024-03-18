import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/hamburguer/inicio/inicio.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PedidosComponent } from './components/hamburguer/pedidos/pedidos.component';
import { NuevoPedidoComponent } from './components/hamburguer/nuevo-pedido/nuevo-pedido.component';
import { PedidosMtoComponent } from './components/hamburguer/pedidos-mto/pedidos-mto.component';
import { MenuMtoComponent } from './components/hamburguer/menu-mto/menu-mto.component';
import { DetallePedidoComponent } from './components/hamburguer/detalle-pedido/detalle-pedido.component';
import { GestionPedidosComponent } from './components/hamburguer/gestion-pedidos/gestion-pedidos.component';


import { HttpClientModule } from '@angular/common/http';
import { PedidosService } from './servicios/pedidos.service';
import { HamburguesasService } from './servicios/hamburguesas.service';
import { GuarnicionesService } from './servicios/guarniciones.service';
import { BebidasService } from './servicios/bebidas.service';
import { SmartTruncatePipe } from './pipes/smart-truncate.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    PedidosComponent,
    NuevoPedidoComponent,
    PedidosMtoComponent,
    MenuMtoComponent,
    DetallePedidoComponent,
    GestionPedidosComponent,
    SmartTruncatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PedidosService,
    HamburguesasService,
    GuarnicionesService,
    BebidasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
