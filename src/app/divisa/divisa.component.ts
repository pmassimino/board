import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CotizacionMoneda, PizarraMoneda } from '../core/models/model';
import { CotizacionMonedaService } from '../core/services/cotizacion-moneda.service';

@Component({
  selector: 'app-divisa',
  templateUrl: './divisa.component.html',
  styleUrls: ['./divisa.component.css']
})
export class DivisaComponent implements OnInit {

  pizarraDivisa:PizarraMoneda=new PizarraMoneda();
  pizarraBillete:PizarraMoneda=new PizarraMoneda();
  @Input() 
  idMercado:string = '002'; 
  constructor(private cotizacionMonedaService:CotizacionMonedaService) { }

  ngOnInit(): void {
    this.populate();
    //Actualizar Cada 15 minutos   
    const source = timer(1000, 900000);
    source.subscribe(res=>this.populate());
  }
  populate():void
  {     
    this.cotizacionMonedaService.findPizarra(this.idMercado).subscribe(res =>{this.pizarraDivisa = this.transformData(res);}, err =>{console.log(err);});
  }
  transformData(data:CotizacionMoneda[])
  {  
     let result:PizarraMoneda=new PizarraMoneda();     
     result.DolarCompra = data.find(d=>d.id_moneda=="DOL")?.precioCompra ||0;
     result.DolarVenta = data.find(d=>d.id_moneda=="DOL")?.precioVenta ||0;
     result.EuroCompra = data.find(d=>d.id_moneda=="060")?.precioCompra ||0;
     result.EuroVenta = data.find(d=>d.id_moneda=="060")?.precioVenta ||0;
     result.RealCompra = data.find(d=>d.id_moneda=="012")?.precioCompra ||0;
     result.RealVenta = data.find(d=>d.id_moneda=="012")?.precioVenta ||0;
     return result;
  }

}
