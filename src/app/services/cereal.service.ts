import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../core/services/config.service';
import { CrudService } from '../core/services/crud.service';
import { Cereal } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CerealService extends CrudService<Cereal,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/cereal/');
  }
}
