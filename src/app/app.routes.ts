import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Páginas/Inicio/inicio').then((archivo) => archivo.Inicio)
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./Páginas/Productos/productos').then(
        (archivo) => archivo.Productos
      )
  },
  {
    path: 'productos/:id',
    loadComponent: () =>
      import('./Páginas/detalle-producto/detalle-producto').then(
        (archivo) => archivo.DetalleProducto
      )
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./Páginas/Conctacto/Conctacto').then(
        (archivo) => archivo.Contacto
      )
  },
  {
    path: 'galeria',
    loadComponent: () =>
      import('./Páginas/Galería/galería').then(
       (archivo) => archivo.Galeria
      )
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./Páginas/Favoritos/Favoritos').then(
        (archivo) => archivo.Favoritos
      )
  },
  {
    path: '**',
    loadComponent: () =>
      import('./Páginas/no-encontrado/no-encontrado').then(
        (archivo) => archivo.NoEncontrado
      )
  }
];
 