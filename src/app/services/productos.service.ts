import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})




export class ProductosService {

  cargando=true;

  productos:Producto[]=[];


  productosFiltrado:Producto[]=[];

  constructor( private http:HttpClient) {

    this.cargarProductos();

   }



   private cargarProductos(){

return new Promise<void> ((resolve, reject)=>{
  this.http.get('https://agular-html-34b7f-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp: any)=>{

        this.productos=resp;
        this.cargando=false;
        resolve();
      });

    });



}
  getProducto(id: string ) :Observable<ProductoDescripcion> {
 return this.http.get<ProductoDescripcion>(`https://agular-html-34b7f-default-rtdb.firebaseio.com/productos/${id}.json`);

}

  buscarProducto(termino:string){

    if (this.productos.length ==0) {
      // cargar productos
this.cargarProductos().then(()=>{
      //ejecutar despues de tener los productos
      //aplicar e filtro
this.filtrarProductos(termino);

});
    }else{
      //aplicar el filtro
      this.filtrarProductos(termino);
    }

    
  }

  private filtrarProductos(termino:string){

    console.log(this.productos);
    this.productosFiltrado=[];

        termino=termino.toLowerCase();

        this.productos.forEach(prod=>{

          const tituloLower=prod.titulo.toLowerCase();

         if (prod.categoria.indexOf(termino)>=0  || tituloLower.indexOf(termino)>=0) {
           this.productosFiltrado.push(prod);
         }
    });
  }


}
