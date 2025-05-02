import { Component, inject } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { VacanteService } from '../../services/vacante.service';
import { FechaService } from '../../services/fecha.service';
import Swal from 'sweetalert2'
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-solicitudes-empresa',
  imports: [NgClass, RouterLink],
  templateUrl: './mis-solicitudes-empresa.component.html',
  styleUrl: './mis-solicitudes-empresa.component.css'
})
export class MisSolicitudesEmpresaComponent {

  solicitudes: any[] = [];
  service = inject(SolicitudService);
  serviceVacantes = inject(VacanteService);
  fechaService = inject(FechaService);
  fechaFormateada!: string;

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

  ngOnInit(): void {
    let email = '';
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      email = usuario.email;
    }

    if (email) {
      this.service.getByEmail(email).subscribe(data => {
        this.solicitudes = data;
        console.log(data);
      });
    }
  }
  
  obtenerTextoEstado(estado: number): string {
    switch (estado) {
      case 0: return 'Pendiente';
      case 1: return 'Aceptada';
      case 2: return 'Cancelada';
      default: return 'Desconocido';
    }
  }
  
  cancelarSolicitud(id: number): void {
    this.service.cancelarSolicitud(id).subscribe(() => {
      const solicitud = this.solicitudes.find(s => s.idSolicitud === id);
      if (solicitud) solicitud.estado = 2;
            // Toast de éxito
            this.toast.fire({
              icon: 'success',
              title: 'Solicitud cancelada'
            });
    });
  }
}
