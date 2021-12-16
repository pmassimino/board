import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MercadoService } from 'src/app/services/mercado.service';
import { CotizacionCereal,Mercado,PizarraCereal } from '../../models/model';
import { CotizacionCerealService } from '../../services/cotizacion-cereal.service';




@Component({
  selector: 'app-cotizacion-form',
  templateUrl: './cotizacion-form.component.html',
  styleUrls: ['./cotizacion-form.component.css']
})
export class CotizacionFormComponent implements OnInit {

  entity:CotizacionCereal[];
  mercado:Mercado[];
  isLoadingResults = true;
  pizarraData:PizarraCereal=new PizarraCereal();
  form :  FormGroup;  
  constructor(private service : CotizacionCerealService,private mercadoService:MercadoService,private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    //Default Values
    let fecha: Date = new Date();
    let idMercado:string="001";
    this.pizarraData.id_mercado =idMercado;   
    this.pizarraData.fecha = fecha;
    
    this.populateData(idMercado,fecha);
    this.createForm();
  }


  populateData(idMercado:string,fecha:Date=new Date()):void
  {
  this.populatePizarra(idMercado);
  this.mercadoService.findAll().subscribe(res =>{this.mercado = res;},err =>{console.log(err);},);
  }

  populatePizarra(idMercado:string,fecha: Date = new Date())
  {  
    this.service.findPizarra(idMercado,fecha).subscribe(res =>{this.entity = res;
    this.transformData(res);this.isLoadingResults = false},err =>{console.log(err);
    this.isLoadingResults = false},);
  }

  createForm():void
    {
      this.form = this.formBuilder.group({
      idMercado: new FormControl(this.pizarraData.id_mercado,Validators.required),
      fecha: new FormControl(this.pizarraData.fecha,Validators.required),
      soja: new FormControl(this.pizarraData.soja,Validators.min(0)),
      maiz: new FormControl(this.pizarraData.maiz,Validators.min(0)),
      trigo: new FormControl(this.pizarraData.trigo,Validators.min(0)),
      sorgo: new FormControl(this.pizarraData.sorgo,Validators.min(0)),
      girasol: new FormControl(this.pizarraData.girasol,Validators.min(0))});      
  }   
  
  transformData(data:CotizacionCereal[])
  {       
     this.pizarraData.soja = data.find(d=>d.idCereal=="23")?.precio ||0;
     this.pizarraData.maiz = data.find(d=>d.idCereal=="19")?.precio ||0;
     this.pizarraData.sorgo = data.find(d=>d.idCereal=="22")?.precio ||0;
     this.pizarraData.girasol = data.find(d=>d.idCereal=="02")?.precio ||0;
     this.pizarraData.trigo = data.find(d=>d.idCereal=="15")?.precio ||0;
  }
  onSubmit(){
    var cotizacion:CotizacionCereal = new CotizacionCereal();
    
    cotizacion.idCereal = "23";
    this.form.value
    cotizacion.idMercado = this.form.value.idMercado;
    cotizacion.idMoneda = "PES";
    cotizacion.precio = this.form.value.soja;
    cotizacion.fecha = this.form.value.fecha;
    this.service.add(cotizacion).subscribe();
//Maiz
    cotizacion = new CotizacionCereal();    
    cotizacion.idCereal = "19";
    cotizacion.idMercado = this.form.value.idMercado;
    cotizacion.idMoneda = "PES";
    cotizacion.precio = this.form.value.maiz;
    cotizacion.fecha = this.form.value.fecha;
    this.service.add(cotizacion).subscribe();
    //Trigo
    cotizacion = new CotizacionCereal();
       
    cotizacion.idCereal = "15";
    cotizacion.idMercado = this.form.value.idMercado;
    cotizacion.idMoneda = "PES";
    cotizacion.precio = this.form.value.trigo;
    cotizacion.fecha = this.form.value.fecha;
    this.service.add(cotizacion).subscribe();
    //girasol
    cotizacion = new CotizacionCereal();
    cotizacion.idCereal = "02";
    cotizacion.idMercado = this.form.value.idMercado;
    cotizacion.idMoneda = "PES";
    cotizacion.precio = this.form.value.girasol;
    cotizacion.fecha = this.form.value.fecha;
    this.service.add(cotizacion).subscribe();
    //sorgo
    cotizacion = new CotizacionCereal();
    cotizacion.idCereal = "22";
    cotizacion.idMercado = this.form.value.idMercado;
    cotizacion.idMoneda = "PES";
    cotizacion.precio = this.form.value.sorgo;
    cotizacion.fecha = this.form.value.fecha;
    this.service.add(cotizacion).subscribe();
  }



}
