import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  titulo = 'Listado de Productos';
  productos: Producto[];

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) pagginador: MatPaginator;

  constructor(private service: ProductoService) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos(){
    this.service.listarProductos(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(productos => {
      this.productos = productos.content as Producto[];
      this.totalRegistros = productos.totalElements as number;
      this.pagginador._intl.itemsPerPageLabel = 'Registros por Página: ';
    })
  }

}
