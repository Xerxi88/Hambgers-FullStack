export interface Pedido {

  id:number;
  nombre_cliente:string;
  comentario:string;
  hora_pedido:Date;
  idhamburguesa:number;
  hamburguesa:string | null;
  hamburguesaCoste:number;
  idguarnicion:number | null;
  guarnicion:string | null
  guarnicionCoste:number,
  idbebida:number | null;
  bebida:string | null
  bebidaCoste:number,
  tiempo_transcurrido: string,
  precioTotal:number;
}
