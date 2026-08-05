import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../Modelos/Producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosServicio {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/productos`;

  obtenerProductos(categoriaId?: number): Observable<Producto[]> {
    const url = categoriaId === undefined
      ? this.api
      : `${this.api}?categoria=${categoriaId}`;

    return this.http.get<Producto[]>(url);
  }

  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.api}/${id}`);
  }

  crearProducto(producto: Partial<Producto>): Observable<unknown> {
    return this.http.post(this.api, producto);
  }
}
