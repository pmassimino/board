import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { CotizacionCereal } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class CotizacionCerealService extends CrudService<CotizacionCereal,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/cotizacioncereal/');
  }
  findPizarra(idMercado : string,fecha: Date): Observable<CotizacionCereal[]> {
    let params = new HttpParams();
    params.set('fecha', fecha.toDateString());
    return this.http.get<CotizacionCereal[]>(this.base + "pizarra/" + idMercado,{params : params});
  }

}
