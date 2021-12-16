import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../core/services/config.service';
import { TiempoInfo } from '../models/model';
import { TiempoService } from '../services/tiempo.service';

@Component({
  selector: 'app-el-tiempo',
  templateUrl: './el-tiempo.component.html',
  styleUrls: ['./el-tiempo.component.css']
})
export class ElTiempoComponent implements OnInit {

  constructor(private tiempoService:TiempoService,private configService:ConfigService) { }

  tiempoInfo:TiempoInfo;
  
  ngOnInit(): void {
    this.populate();
  }

  populate()
  { 
    //Tiempo
    let apiId = this.configService.data.apiId;
    let idLocalidad = this.configService.data.idLocalidad;
    this.tiempoService.get(apiId,idLocalidad).subscribe(res=>this.tiempoInfo=res);
   
  }

  getDayName(dateString:string):string
  {
    var days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName;
  }

}
