import { VacanteService } from './../../services/vacante.service';
import { Component, inject, Input } from '@angular/core';
import { FechaService } from '../../services/fecha.service';
import { NgClass } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-card-vacante-empresa',
  imports: [NgClass, RouterLink],
  templateUrl: './card-vacante-empresa.component.html',
  styleUrl: './card-vacante-empresa.component.css'
})
export class CardVacanteEmpresaComponent {


  @Input() item!: any;
  fechaService = inject(FechaService);
  solicitudService = inject(SolicitudService);
  arraySolicitudes: any[] = [];
  router = inject(Router);
  vacanteService = inject(VacanteService);
  apiUrl = environment.apiUrl;

  toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  formatearFecha(fecha: string | Date): string {
    return this.fechaService.formatearFecha(fecha);
  }

  imagenError(event: any) {
    event.target.src = 'http://localhost:9001/uploads/sin_imagen.png';
  }

  ngOnInit() {
    this.getSolicitudesDeVacante();
  }

  getSolicitudesDeVacante() {
    this.solicitudService.getSolicitudesByVacante(this.item.idVacante).subscribe(
      (solicitudes) => {
        this.arraySolicitudes = solicitudes;
      },
      (error) => {
        console.error('Error al obtener solicitudes:', error);
      }
    );
  }

  obtenerTextoEstado(estado: number): string {
    switch (estado) {
      case 0: return 'Pendiente';
      case 1: return 'Aceptada';
      case 2: return 'Cancelada';
      default: return 'Desconocido';
    }
  }
  
  asignarSolicitud(idSolicitud: number, idVacante: number): void {
    this.solicitudService.asignarSolicitud(idVacante, idSolicitud).subscribe(() => {
      // Actualizar estados de solicitudes
      this.arraySolicitudes.forEach(solicitud => {
        if (solicitud.idSolicitud === idSolicitud) {
          solicitud.estado = 1;
        } else {
          solicitud.estado = 2;
        }
      });
  
      // ✅ Actualizar estatus visual de la vacante
      this.item.estatus = 'CUBIERTA';
  
      this.toast.fire({
        icon: 'success',
        title: 'Vacante asignada'
      });
    });
  }

  cancelarSolicitud(id: number): void {
    this.solicitudService.cancelarSolicitud(id).subscribe(() => {
      const solicitud = this.arraySolicitudes.find(s => s.idSolicitud === id);
      if (solicitud) solicitud.estado = 2;
            // Toast de éxito
            this.toast.fire({
              icon: 'success',
              title: 'Solicitud cancelada'
            });
    });
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    Swal.fire({
      title: 'Cambiar estado',
      text: `¿Quieres cambiar la vacante a ${nuevoEstado}?`,
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vacanteService.cambiarEstadoVacante(id, nuevoEstado).subscribe({
          next: () => {
            // Actualiza el estado de la vacante directamente en el array
            this.item.estatus = nuevoEstado;
  
            this.toast.fire({
              icon: 'success',
              title: `Estado cambiado a ${nuevoEstado}`
            });
          },
          error: () => {
            this.toast.fire({
              icon: 'error',
              title: 'Error al cambiar el estado'
            });
          }
        });
      }
    });
  
  }
}
