import { computed, Injectable, signal } from '@angular/core';
import { Producto } from '../Modelos/Producto';

@Injectable({
  providedIn: 'root'
})
export class FavoritosServicio {
  private readonly listaFavoritos = signal<Producto[]>([]);

  readonly favoritos = this.listaFavoritos.asReadonly();
  readonly total = computed(() => this.listaFavoritos().length);

  agregar(producto: Producto): void {
    if (!this.existe(producto.id)) {
      this.listaFavoritos.update((favoritos) => [...favoritos, producto]);
    }
  }

  eliminar(id: number): void {
    this.listaFavoritos.update((favoritos) =>
      favoritos.filter((producto) => producto.id !== id)
    );
  }

  obtenerTodos() {
    return this.favoritos;
  }

  existe(id: number): boolean {
    return this.listaFavoritos().some((producto) => producto.id === id);
  }
}
