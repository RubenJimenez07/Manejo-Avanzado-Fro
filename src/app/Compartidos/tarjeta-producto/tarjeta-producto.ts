import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Producto } from '../../Modelos/Producto';
import { FavoritosServicio } from '../../Servicios/favoritos';
@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [RouterLink, ButtonModule, CardModule, TagModule],
  templateUrl: './tarjeta-producto.html',
  styleUrl: './tarjeta-producto.css'
})
export class TarjetaProducto {
  readonly producto = input.required<Producto>();
  readonly favoritoSeleccionado = output<Producto>();

  private readonly favoritosServicio = inject(FavoritosServicio);
  readonly favoritos = this.favoritosServicio.obtenerTodos();

  esFavorito(): boolean {
    return this.favoritos().some(
      (favorito) => favorito.id === this.producto().id
    );
  }

  seleccionarFavorito(): void {
    this.favoritoSeleccionado.emit(this.producto());
  }
}
