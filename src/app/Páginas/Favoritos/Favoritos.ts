import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { Producto } from '../../Modelos/Producto';
import { FavoritosServicio } from '../../Servicios/favoritos';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, ButtonModule, CardModule, DialogModule, MessageModule, TagModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {
  private readonly favoritosServicio = inject(FavoritosServicio);

  readonly favoritos = this.favoritosServicio.obtenerTodos();
  readonly total = this.favoritosServicio.total;

  mostrarDialogo = false;
  productoSeleccionado: Producto | null = null;

  abrirDialogoEliminar(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.mostrarDialogo = true;
  }

  confirmarEliminacion(): void {
    if (this.productoSeleccionado) {
      this.favoritosServicio.eliminar(this.productoSeleccionado.id);
      this.mostrarDialogo = false;
      this.productoSeleccionado = null;
    }
  }

  cancelarEliminacion(): void {
    this.mostrarDialogo = false;
    this.productoSeleccionado = null;
  }
}
