import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FechaService } from '../../services/fecha.service';

@Component({
  selector: 'app-administrador-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador-detalle.component.html'
})
export class AdministradorDetalleComponent implements OnInit {
  administrador: any = null;
  usuarioService = inject(UsuarioService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fechaService = inject(FechaService);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      const email: string = params.email;
      this.usuarioService.getById(email).subscribe({
        next: (response) => {
          this.administrador = response;
        },
        error: (error) => {
          console.error('Error al cargar administrador:', error);
          this.router.navigate(['/administradores']);
        }
      });
    });
  }

  formatearFecha(fecha: string | Date): string {
    return this.fechaService.formatearFecha(fecha);
  }

  volver() {
    this.router.navigate(['/administradores']);
  }
} 