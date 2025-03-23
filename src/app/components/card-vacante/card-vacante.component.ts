import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FechaService } from '../../services/fecha.service';

@Component({
  selector: 'app-card-vacante',
  imports: [NgClass],
  templateUrl: './card-vacante.component.html',
  styleUrl: './card-vacante.component.css'
})
export class CardVacanteComponent {
  @Input() item!: any;
  fechaService = inject(FechaService);

  formatearFecha(fecha: string | Date): string {
    return this.fechaService.formatearFecha(fecha);
  }

  imagenError(event: any) {
    event.target.src = 'http://localhost:9001/uploads/sin_imagen.png';
  }
}
