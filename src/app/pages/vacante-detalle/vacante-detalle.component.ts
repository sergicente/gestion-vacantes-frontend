import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FechaService } from '../../services/fecha.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-vacante-detalle',
  imports: [RouterLink, NgClass],
  templateUrl: './vacante-detalle.component.html',
  styleUrl: './vacante-detalle.component.css'
})
export class VacanteDetalleComponent {
  vacante!: any;
  vacanteServicio = inject(VacanteService);
  activatedRoute = inject(ActivatedRoute);
  fechaService = inject(FechaService);
  router = inject(Router);
  fechaFormateada!: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      const id: string = params.id;
      this.vacanteServicio.getById(id).subscribe((peticion) => {
        this.vacante = peticion;
        console.log(this.vacante);
      });
    });
  }

  formatearFecha(fecha: string | Date): string {
    return this.fechaService.formatearFecha(fecha);
  }

  imagenError(event: any) {
    event.target.src = 'http://localhost:9001/uploads/sin_imagen.png';
  }

  borrarvacante() {
    this.vacanteServicio.borrar(this.vacante.id).subscribe({
      next: () => {
        console.log('vacante eliminada correctamente');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al eliminar la vacante:', err);
      }
    });
  }
}