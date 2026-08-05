import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria } from '../Modelos/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasServicio {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/categorias`;

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.api);
  }

  crearCategoria(nombre: string): Observable<unknown> {
    return this.http.post(this.api, { nombre });
  }

  actualizarCategoria(id: number, nombre: string): Observable<unknown> {
    return this.http.put(`${this.api}/${id}`, { nombre });
  }

  eliminarCategoria(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
