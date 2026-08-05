import { computed, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Modelos/Producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritosServicio {
  private readonly http = inject(HttpClient);
  private readonly listaFavoritos = signal<Producto[]>([]);
  private readonly api = `${environment.apiUrl}/favoritos`;

  readonly favoritos = this.listaFavoritos.asReadonly();
  readonly total = computed(() => this.listaFavoritos().length);

  agregar(producto: Producto): void {
    if (!this.existe(producto.id)) {
      this.http.post(this.api, { producto_id: producto.id }).subscribe({
        next: () => this.cargarFavoritos(),
        error: () => this.cargarFavoritos()
      });
    }
  }

  eliminar(id: number): void {
    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => this.cargarFavoritos(),
      error: () => this.cargarFavoritos()
    });
  }

  obtenerTodos() {
    this.cargarFavoritos();
    return this.favoritos;
  }

  existe(id: number): boolean {
    return this.listaFavoritos().some((producto) => producto.id === id);
  }

  private cargarFavoritos(): void {
    this.http.get<Producto[]>(this.api).subscribe({
      next: (favoritos) => this.listaFavoritos.set(favoritos),
      error: () => this.listaFavoritos.set([])
    });
  }
}
