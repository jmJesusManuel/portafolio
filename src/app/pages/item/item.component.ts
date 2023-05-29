import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
  export class ItemComponent implements OnInit{


    producto: ProductoDescripcion | undefined;
    id: string | undefined;

  constructor( private route:ActivatedRoute,
              public productoService:ProductosService){


  }



  ngOnInit() {
    this.route.params
          .subscribe( parametros=>{
              //  console.log(parametros['id']);
                this.productoService.getProducto(parametros['id'])

          .subscribe({
          next:(res:ProductoDescripcion)=>
          {

           // console.log(res)
            this.id=parametros['id'];
            this.producto=res;

          },error:(e )=>{

            console.error(e);

          }
        });






  });
}
}
