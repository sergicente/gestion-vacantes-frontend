import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../../services/empresa.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-gestion-empresas',
  imports: [RouterLink],
  templateUrl: './gestion-empresas.component.html'
})
export class GestionEmpresasComponent {
  empresaService = inject(EmpresaService);
  authService = inject(AuthService);
  arrayEmpresas: any[] = [];
  rol: string = '';

  ngOnInit() {
    this.rol = this.authService.getRol();
    this.empresaService.getAll().subscribe((response) => {
      console.log(response);
      this.arrayEmpresas = response;
    });
  }

  borrarEmpresa(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta empresa?')) {
      this.empresaService.borrar(id).subscribe({
        next: () => {
          console.log('Empresa eliminada correctamente');
          this.arrayEmpresas = this.arrayEmpresas.filter(empresa => empresa.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar la empresa:', err);
        }
      });
    }
  }

  enviarCV(empresaId: string) {
    // Lógica para enviar CV
    console.log('Enviando CV a la empresa:', empresaId);
  }

  verEstadoSolicitud(empresaId: string) {
    // Lógica para ver estado de solicitud
    console.log('Ver estado de solicitud para empresa:', empresaId);
  }

  cancelarSolicitud(empresaId: string) {
    // Lógica para cancelar solicitud
    console.log('Cancelando solicitud para empresa:', empresaId);
  }
} 