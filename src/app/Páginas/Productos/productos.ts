import { Component, inject } from '@angular/core';
import { ProductosServicio } from '../../Servicios/producto';
import { FavoritosServicio } from '../../Servicios/favoritos';
import { Producto } from '../../Modelos/Producto';
import { TarjetaProducto } from '../../Compartidos/tarjeta-producto/tarjeta-producto';

@Component({
  selector: 'app-productos',
  imports: [TarjetaProducto],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  private readonly productosServicio = inject(ProductosServicio);
  private readonly favoritosServicio = inject(FavoritosServicio);

  readonly productos = this.productosServicio.obtenerProductos();

  agregarFavorito(producto: Producto): void {
    this.favoritosServicio.agregar(producto);
  }
}

