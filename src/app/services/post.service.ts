import { Injectable } from '@angular/core';
import { CrudService } from '../core/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/services/config.service';
import { Post } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class PostService extends CrudService<Post,number> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/post/');
  }
}
