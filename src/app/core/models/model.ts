export class CotizacionMoneda {
    id: number;
    fecha: Date;    
    id_mercado: string;
    id_moneda: string;
    precioCompra: number;
    precioVenta: number;
    obs: string;
    Moneda: Moneda;
    MercadoMoneda: MercadoMoneda;
}
export class Moneda
{
    id: string;
    nombre:string;    
}
export class MercadoMoneda
{
    id: string;
    nombre:string;
    
}

export class PizarraMoneda
{
  id_mercado:string;
  fecha:Date;
  DolarCompra:number;
  DolarVenta:number;
  EuroCompra:number;
  EuroVenta:number;
  RealCompra:number;
  RealVenta:number;
}