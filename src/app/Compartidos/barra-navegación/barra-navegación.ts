import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    ToolbarModule
  ],
  templateUrl: './barra-navegación.html',
styleUrl: './barra-navegación.css'
})
export class BarraNavegacion {}

