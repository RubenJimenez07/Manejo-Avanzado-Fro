export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string | null;
  categoria_id?: number | null;
  categoria_nombre?: string | null;
}
