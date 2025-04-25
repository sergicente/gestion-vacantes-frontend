import { Component, inject, NgModule } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { NgClass } from '@angular/common';
import { VacanteService } from '../../services/vacante.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-solicitudes',
  imports: [NgClass, RouterLink],
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.css'
})
export class MisSolicitudesComponent {
  solicitudes: any[] = [];
  service = inject(SolicitudService);
  serviceVacantes = inject(VacanteService);


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
    });
  }
}
