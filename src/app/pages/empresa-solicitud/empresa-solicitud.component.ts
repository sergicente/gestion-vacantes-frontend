import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { AuthService } from '../../services/auth.service';
import { ISolicitud } from '../../interfaces/isolicitud';
import { CommonModule } from '@angular/common';
import  Swal  from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-empresa-solicitudes',
  templateUrl: './empresa-solicitud.component.html',
  imports: [CommonModule]
})
export class EmpresaSolicitudesComponent implements OnInit {
  solicitudes: ISolicitud[] = [];
  router: any;

  constructor(private solicitudService: SolicitudService, private auth: AuthService) {}

  ngOnInit(): void {
    const idEmpresa = localStorage.getItem('empresaId');

    if (idEmpresa) {
      this.solicitudService.getSolicitudesPorEmpresa(+idEmpresa).subscribe(data => {
        this.solicitudes = data;
        console.log('📩 Solicitudes recibidas:', data);
      });
    } else {
      console.warn('⚠️ No se encontró empresaId en localStorage');
      alert('Debes iniciar sesión como empresa para ver las solicitudes.');
      this.router.navigate(['/login-empresa']);
    }
  }

  aceptarSolicitud(idSolicitud: number, idVacante: number): void {
    Swal.fire({
      title: '¿Aceptar esta solicitud?',
      text: 'Esto adjudicará la vacante y eliminará las demás solicitudes.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.solicitudService.asignarVacante(idVacante, idSolicitud).subscribe(() => {
          Swal.fire('✅ Vacante adjudicada', '', 'success');
          this.solicitudes = this.solicitudes.filter(s => s.idVacante !== idVacante || s.idSolicitud === idSolicitud);
          this.solicitudes.forEach(solicitud => {
            if (solicitud.idSolicitud === idSolicitud) {
              solicitud.estado = 1;
            }
          });
        });
      }
    });
  }
}