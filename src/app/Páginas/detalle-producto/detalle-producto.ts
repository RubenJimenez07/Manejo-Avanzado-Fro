import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';

import { ProductosServicio } from '../../Servicios/producto';
import { Producto } from '../../Modelos/Producto';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    CardModule,
    DialogModule,
    MessageModule,
    TagModule
  ],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto {

  private readonly ruta = inject(ActivatedRoute);
  private readonly productosServicio = inject(ProductosServicio);

  mostrarDialogo = false;

  readonly producto = signal<Producto | null>(null);
  readonly cargando = signal(true);

  constructor() {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));

    this.productosServicio.obtenerProductoPorId(id).subscribe({
      next: (respuesta) => {
        this.producto.set(respuesta);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error(error);
        this.producto.set(null);
        this.cargando.set(false);
      }
    });
  }

}
