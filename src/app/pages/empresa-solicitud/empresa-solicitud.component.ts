import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { AuthService } from '../../services/auth.service';
import { ISolicitud } from '../../interfaces/isolicitud';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-empresa-solicitudes',
  templateUrl: './empresa-solicitud.component.html',
  imports: [CommonModule]
})
export class EmpresaSolicitudesComponent implements OnInit {
  solicitudes: ISolicitud[] = [];

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
    }
  }
}
