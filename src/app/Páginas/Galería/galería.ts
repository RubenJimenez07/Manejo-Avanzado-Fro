import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { KnobModule } from 'primeng/knob';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

interface ImagenGaleria {
  src: string;
  miniatura: string;
  titulo: string;
  descripcion: string;
  alt: string;
}

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    GalleriaModule,
    KnobModule,
    SelectButtonModule,
    SliderModule,
    ToggleSwitchModule
  ],
  templateUrl: './galería.html',
styleUrl: './galería.css'
})
export class Galeria {
  readonly imagenes: ImagenGaleria[] = [
    {
      src: '/galeria/montana-nieve.png',
      miniatura: '/galeria/montana-nieve.png',
      titulo: 'Montaña de nieve',
      descripcion: 'Un paisaje de montaña cubierto de nieve.',
      alt: 'Montaña cubierta de nieve'
    },
    {
      src: '/galeria/cielo-nublado.png',
      miniatura: '/galeria/cielo-nublado.png',
      titulo: 'Cielo nublado',
      descripcion: 'Un cielo cubierto de nubes.',
      alt: 'Cielo nublado'
    },
    {
      src: '/galeria/cueva-brillante.png',
      miniatura: '/galeria/cueva-brillante.png',
      titulo: 'Cueva brillante',
      descripcion: 'Una cueva iluminada con un brillo especial.',
      alt: 'Cueva brillante'
    },
    {
      src: '/galeria/tormenta-electrica.png',
      miniatura: '/galeria/tormenta-electrica.png',
      titulo: 'Tormenta eléctrica',
      descripcion: 'Una tormenta iluminada por rayos.',
      alt: 'Tormenta eléctrica'
    },
    {
      src: '/galeria/volcan.png',
      miniatura: '/galeria/volcan.png',
      titulo: 'Volcán',
      descripcion: 'Un volcán en plena actividad.',
      alt: 'Volcán'
    }
  ];

  readonly opcionesVista = ['Compacta', 'Cómoda', 'Amplia'];
  readonly opcionesResponsivas = [
    { breakpoint: '720px', numVisible: 3 },
    { breakpoint: '480px', numVisible: 2 }
  ];

  reproduccionAutomatica = false;
  mostrarMiniaturas = true;
  intervalo = 3000;
  vista = 'Cómoda';
  zoom = 70;
}
