import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TarjetaProducto } from '../../Compartidos/tarjeta-producto/tarjeta-producto';
import { ProductosServicio } from '../../Servicios/producto';
import { CategoriasServicio } from '../../Servicios/categorias';
import { FavoritosServicio } from '../../Servicios/favoritos';
import { Producto } from '../../Modelos/Producto';
import { Categoria } from '../../Modelos/Categoria';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, ButtonModule, SelectModule, TarjetaProducto],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

  private readonly productosServicio = inject(ProductosServicio);
  private readonly categoriasServicio = inject(CategoriasServicio);
  private readonly favoritosServicio = inject(FavoritosServicio);

  readonly productos = signal<Producto[]>([]);
  readonly categorias = signal<Categoria[]>([]);
  readonly cargandoCategorias = signal(true);

  nombreNuevo = '';
  descripcionNueva = '';
  precioNuevo = 0;
  imagenNueva = '';
  categoriaSeleccionadaId: number | null = null;

  constructor() {
    this.cargarCategorias();
    this.cargarProductos();
  }

  cargarCategorias(): void {
    this.cargandoCategorias.set(true);
    this.categoriasServicio.obtenerCategorias().subscribe({
      next: (respuesta) => {
        this.categorias.set(respuesta);
        this.cargandoCategorias.set(false);
      },
      error: (error) => {
        console.error(error);
        this.cargandoCategorias.set(false);
      }
    });
  }

  cargarProductos(): void {
    this.productosServicio.obtenerProductos().subscribe({
      next: (respuesta) => {
        this.productos.set(respuesta);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  crearProducto(): void {
    const nombre = this.nombreNuevo.trim();
    const descripcion = this.descripcionNueva.trim();
    const precio = Number(this.precioNuevo);
    const categoria_id = this.categoriaSeleccionadaId;

    if (!nombre || !categoria_id || precio <= 0) {
      return;
    }

    this.productosServicio.crearProducto({
      nombre,
      descripcion,
      precio,
      imagen: this.imagenNueva.trim() || null,
      categoria_id
    }).subscribe({
      next: () => {
        this.limpiarFormulario();
        this.cargarProductos();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  limpiarFormulario(): void {
    this.nombreNuevo = '';
    this.descripcionNueva = '';
    this.precioNuevo = 0;
    this.imagenNueva = '';
    this.categoriaSeleccionadaId = null;
  }

  agregarFavorito(producto: Producto): void {
    this.favoritosServicio.agregar(producto);
  }
}
