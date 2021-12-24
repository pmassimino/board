import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CotizacionMoneda, PizarraMoneda } from '../core/models/model';
import { ConfigService } from '../core/services/config.service';
import { CotizacionMonedaService } from '../core/services/cotizacion-moneda.service';
import { CotizacionCereal, PizarraCereal, TiempoInfo } from '../models/model';
import { CotizacionCerealService } from '../services/cotizacion-cereal.service';
import { TiempoService } from '../services/tiempo.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  cotizacionCereal:CotizacionCereal[];
  pizarraDisponible:PizarraCereal=new PizarraCereal();
  pizarraForward:PizarraCereal=new PizarraCereal();
  
  tiempoInfo:TiempoInfo;
  

  constructor(private cotizacionCerealservice : CotizacionCerealService,
    private configService:ConfigService) { }

  
  ngOnInit(): void
  {
    this.populate(); 
    //Actualizar Cada un minuto   
    const source = timer(1000, 60000);
    source.subscribe(res=>this.populate());
  }
 
  populate()
  {  
    let fecha: Date = new Date();
    let idMercado:string="001";    
    this.cotizacionCerealservice.findPizarra(idMercado,fecha).subscribe(res =>{this.pizarraDisponible = this.transformData(res);}, err =>{console.log(err);});
    
    idMercado="002";    
    this.cotizacionCerealservice.findPizarra(idMercado,fecha).subscribe(res =>{this.pizarraForward = this.transformData(res);}, err =>{console.log(err);});    
       
  }

  
  
  transformData(data:CotizacionCereal[])
  {  
     let result:PizarraCereal=new PizarraCereal();     
     result.soja = data.find(d=>d.idCereal=="23")?.precio ||0;
     result.sojaObs = data.find(d=>d.idCereal=="23")?.obs ||"";
     result.maiz = data.find(d=>d.idCereal=="19")?.precio ||0;
     result.maizObs = data.find(d=>d.idCereal=="19")?.obs ||"";
     result.sorgo = data.find(d=>d.idCereal=="22")?.precio ||0;
     result.sorgoObs = data.find(d=>d.idCereal=="22")?.obs ||"";
     result.girasol = data.find(d=>d.idCereal=="02")?.precio ||0;
     result.girasolObs = data.find(d=>d.idCereal=="02")?.obs ||"";
     result.trigo = data.find(d=>d.idCereal=="15")?.precio ||0;
     result.trigoObs = data.find(d=>d.idCereal=="15")?.obs ||"";
     return result;
  }
  

}
