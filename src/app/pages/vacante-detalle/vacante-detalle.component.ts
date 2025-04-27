import { Component, inject } from '@angular/core';
import { VacanteService } from '../../services/vacante.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FechaService } from '../../services/fecha.service';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-vacante-detalle',
  imports: [RouterLink, NgClass],
  templateUrl: './vacante-detalle.component.html',
  styleUrl: './vacante-detalle.component.css'
})
export class VacanteDetalleComponent {
  rol: string = '';
  usuario: string = '';
  vacante!: any;
  vacanteServicio = inject(VacanteService);
  activatedRoute = inject(ActivatedRoute);
  servicioSolicitud = inject(SolicitudService);
  fechaService = inject(FechaService);
  router = inject(Router);
  fechaFormateada!: string;
  yaHaAplicado: boolean = false;

  ngOnInit() {
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      this.rol = usuario.rol;
      this.usuario = usuario.email;
    }

    this.activatedRoute.params.subscribe((params: any) => {
      const id: string = params.id;
      this.vacanteServicio.getById(id).subscribe((peticion) => {
        this.vacante = peticion;

        this.servicioSolicitud.verificarAplicacion(this.usuario, this.vacante.idVacante).subscribe((aplicado) => {
          this.yaHaAplicado = aplicado;
        });
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