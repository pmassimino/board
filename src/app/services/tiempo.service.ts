import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TiempoInfo } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class TiempoService {
  public base:string="https://api.tutiempo.net/json/";
  constructor(protected http: HttpClient)    
    {
    }
  get(apiID:string,idLocalidad:string): Observable<TiempoInfo> {
    return this.http.get<TiempoInfo>(this.base + '?lan=es&apid=' + apiID + '&lid=' + idLocalidad).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.message}\nMessage: ${error.message}\Descripcion: ${error.error}`;
    }    
    return throwError(error);
  }
}
