import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TarjetaProducto } from '../../Compartidos/tarjeta-producto/tarjeta-producto';
import { Categoria } from '../../Modelos/Categoria';
import { Producto } from '../../Modelos/Producto';
import { CategoriasServicio } from '../../Servicios/categorias';
import { FavoritosServicio } from '../../Servicios/favoritos';
import { ProductosServicio } from '../../Servicios/producto';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    TarjetaProducto
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias {
  private readonly categoriasServicio = inject(CategoriasServicio);
  private readonly productosServicio = inject(ProductosServicio);
  private readonly favoritosServicio = inject(FavoritosServicio);

  readonly categorias = signal<Categoria[]>([]);
  readonly cargando = signal(true);
  readonly productosCategoria = signal<Producto[]>([]);
  readonly cargandoProductos = signal(false);
  readonly categoriaActiva = signal<Categoria | null>(null);

  nombreNueva = '';
  nombreEdicion = '';
  categoriaSeleccionada: Categoria | null = null;
  mostrarDialogoEdicion = false;
  mostrarDialogoEliminacion = false;
  mensajeError = '';

  constructor() {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.cargando.set(true);
    this.mensajeError = '';
    this.categoriasServicio.obtenerCategorias().subscribe({
      next: (respuesta) => {
        this.categorias.set(respuesta);
        this.cargando.set(false);
      },
      error: (error) => {
        this.mensajeError = 'No fue posible cargar las categorías.';
        this.cargando.set(false);
      }
    });
  }

  crearCategoria(): void {
    const nombre = this.nombreNueva.trim();
    if (!nombre) {
      return;
    }

    this.categoriasServicio.crearCategoria(nombre).subscribe({
      next: () => {
        this.nombreNueva = '';
        this.cargarCategorias();
      },
      error: () => this.mensajeError = 'No fue posible crear la categoría.'
    });
  }

  abrirEdicion(categoria: Categoria): void {
    this.categoriaSeleccionada = categoria;
    this.nombreEdicion = categoria.nombre;
    this.mostrarDialogoEdicion = true;
  }

  verProductos(categoria: Categoria): void {
    this.categoriaActiva.set(categoria);
    this.productosCategoria.set([]);
    this.cargandoProductos.set(true);
    this.mensajeError = '';

    this.productosServicio.obtenerProductos(categoria.id).subscribe({
      next: (productos) => {
        this.productosCategoria.set(productos);
        this.cargandoProductos.set(false);
      },
      error: () => {
        this.mensajeError = 'No fue posible cargar los productos de la categoría.';
        this.cargandoProductos.set(false);
      }
    });
  }

  agregarFavorito(producto: Producto): void {
    this.favoritosServicio.agregar(producto);
  }

  guardarEdicion(): void {
    const nombre = this.nombreEdicion.trim();
    if (!this.categoriaSeleccionada || !nombre) {
      return;
    }

    this.categoriasServicio.actualizarCategoria(this.categoriaSeleccionada.id, nombre).subscribe({
      next: () => {
        this.cerrarDialogos();
        this.cargarCategorias();
      },
      error: () => this.mensajeError = 'No fue posible actualizar la categoría.'
    });
  }

  abrirEliminacion(categoria: Categoria): void {
    this.categoriaSeleccionada = categoria;
    this.mostrarDialogoEliminacion = true;
  }

  confirmarEliminacion(): void {
    if (!this.categoriaSeleccionada) {
      return;
    }

    this.categoriasServicio.eliminarCategoria(this.categoriaSeleccionada.id).subscribe({
      next: () => {
        this.cerrarDialogos();
        this.cargarCategorias();
      },
      error: (error) => {
        this.mensajeError = error.status === 409
          ? 'No se puede eliminar una categoría asignada a productos.'
          : 'No fue posible eliminar la categoría.';
      }
    });
  }

  cerrarDialogos(): void {
    this.mostrarDialogoEdicion = false;
    this.mostrarDialogoEliminacion = false;
    this.categoriaSeleccionada = null;
  }
}
