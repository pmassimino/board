import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CotizacionMoneda } from '../models/model';
import { ConfigService } from './config.service';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CotizacionMonedaService extends CrudService<CotizacionMoneda,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrlGlobal + '/cotizacionMoneda/');
}
findPizarra(idMercado : string): Observable<CotizacionMoneda[]> {  
  return this.http.get<CotizacionMoneda[]>(this.base + "pizarra/" + idMercado);
}
}

