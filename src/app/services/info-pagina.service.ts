import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info:infoPagina ={};
  cargada=false;


  equipo: any[]= [];


  constructor( private http:HttpClient ) {

  this.cargarInfo();
  this.cargarEquipo();

   }

   private cargarInfo(){

 //Leer el archivo JSON
 this.http.get('assets/data/data-pagina.json')
 .subscribe((resp: infoPagina)=>{


   this.info=resp;


 });


   }

   private cargarEquipo(): void{
    this.http.get('https://agular-html-34b7f-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp: any)  => {


      this.equipo=resp;
     // console.log(resp);

    });
   }
}
