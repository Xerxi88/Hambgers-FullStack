import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { BebidasService } from 'src/app/servicios/bebidas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';

@Component({
  selector: 'app-menu-mto',
  templateUrl: './menu-mto.component.html',
  styleUrls: ['./menu-mto.component.css']
})
export class MenuMtoComponent {


public hamburguesas:Producto[];
public guarniciones:Producto[];
public bebidas:Producto[];
public hamburguesa:Producto;
public guarnicion:Producto;
public bebida:Producto;


constructor(private servicioHamburguesas:HamburguesasService, private servicioGuarniciones:GuarnicionesService, private servicioBebidas:BebidasService){

  this.hamburguesas=[];
  this.guarniciones=[];
  this.bebidas=[];

  this.hamburguesa={
    id:0,
    nombre:"",
    precio:0
  }
  this.guarnicion={
    id:0,
    nombre:"",
    precio:0
  }
  this.bebida={
    id:0,
    nombre:"",
    precio:0
  }

}


public nuevaHamburguesa(formulario:NgForm){

  const nuevaHamburguesa: Producto = {
    id: 0,
    nombre: this.hamburguesa.nombre,
    precio: this.hamburguesa.precio
  };

  const formData = new FormData();
  formData.append('nombre', this.hamburguesa.nombre);
  formData.append('precio', this.hamburguesa.precio.toString());

  this.servicioHamburguesas.postHamburguesa(formData).subscribe({
    next: (producto) => {
      this.hamburguesas.push(nuevaHamburguesa);
      alert("Hamburguesa agregada");
      formulario.reset();
    },
    error: (error) => {
      alert(error.error);
      console.log(error);
    }
  });
}

public nuevaGuarnicion(formulario:NgForm){

  const nuevaGuarnicion: Producto = {
    id: 0,
    nombre: this.guarnicion.nombre,
    precio: this.guarnicion.precio
  };

  let formData=new FormData();

  formData.append('nombre',this.guarnicion.nombre)
  formData.append('precio',this.guarnicion.precio.toString())

  this.servicioGuarniciones.postGuarnicion(formData).subscribe({
    next:((producto)=>{
      this.guarniciones.push(nuevaGuarnicion);
      alert("Guarnición agregada")
      formulario.reset()
    }),
    error:((error)=>{alert(error.error);console.log(error)})
  })
}

public nuevaBebida(formulario:NgForm){

  const nuevaBebida: Producto = {
    id: 0,
    nombre: this.bebida.nombre,
    precio: this.bebida.precio
  };
  let formData=new FormData();

  formData.append('nombre',this.bebida.nombre)
  formData.append('precio',this.bebida.precio.toString())

  this.servicioBebidas.postBebida(formData).subscribe({
    next:((producto)=>{
      this.bebidas.push(nuevaBebida);
      alert("Bebida agregada")
      formulario.reset()
    }),
    error:((error)=>{alert(error.error);console.log(error)})
  })
}




public borrarHamburguesa(id:number){

  if(confirm("Estas seguro de querer eliminar esta hamburguesa?")){
    this.servicioHamburguesas.deleteHamburguesa(id).subscribe({
      next:((mensaje)=>{
        this.hamburguesas = this.hamburguesas.filter(hamburguesa => hamburguesa.id !== id);
        alert("Hamburguesa eliminada");
    }),
    error:((error)=>{alert(error.error)})
    })}
}

public borrarGuarncion(id:number){

  if(confirm("Estas seguro de querer eliminar esta guarnición?")){
    this.servicioGuarniciones.deleteGuarnicion(id).subscribe({
      next:((mensaje)=>{
        this.guarniciones = this.guarniciones.filter(guarnicion => guarnicion.id !== id);
        alert("Guarnición eliminada")
    }),
    error:((error)=>{alert(error.error)})
    })}
}
public borrarBebida(id:number){

  if(confirm("Estas seguro de querer eliminar esta bebida?")){
    this.servicioBebidas.deleteBebida(id).subscribe({
      next:((mensaje)=>{
        this.bebidas = this.bebidas.filter(bebida => bebida.id !== id);
        alert("Bebida eliminada")
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
      console.log(error);
      alert('Error de respuesta' + error.error);
    }
  })

  this.servicioGuarniciones.getGuarniciones().subscribe({
    next:(guarniciones)=>{
      this.guarniciones=guarniciones;
    },
    error:(error)=>{
      console.log(error);
      alert('Error de respuesta' + error.error);
    }
  })

  this.servicioBebidas.getBebidas().subscribe({
    next:(bebidas)=>{
      this.bebidas=bebidas;
    },
    error:(error)=>{
      console.log(error);
      alert('Error de respuesta' + error.error);
    }
  })
}

}
