import { Component, inject, Input } from '@angular/core';
import { FechaService } from '../../services/fecha.service';
import { NgClass } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card-vacante-empresa',
  imports: [NgClass],
  templateUrl: './card-vacante-empresa.component.html',
  styleUrl: './card-vacante-empresa.component.css'
})
export class CardVacanteEmpresaComponent {

  @Input() item!: any;
  fechaService = inject(FechaService);
  solicitudService = inject(SolicitudService);
  arraySolicitudes: any[] = [];

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
    console.log(this.item);
  }

  getSolicitudesDeVacante() {
    this.solicitudService.getSolicitudesByVacante(this.item.idVacante).subscribe(
      (solicitudes) => {
        this.arraySolicitudes = solicitudes;
        console.log('Solicitudes:', this.arraySolicitudes);
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
        title: 'Solicitud asignada y otras canceladas'
      });
  
      // ✅ También podrías hacer una recarga si quieres forzar refresco:
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([this.router.url]);
      // });
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
}
