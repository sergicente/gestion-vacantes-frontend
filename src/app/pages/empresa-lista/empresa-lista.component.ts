import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { FormEmpresaComponent } from '../form-empresa/form-empresa.component';
import { Router, RouterLink } from '@angular/router';
import { Iempresa } from '../../interfaces/iempresa';
import { IUsuario } from '../../interfaces/iusuario';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empresa-lista',
  standalone: true,
  imports: [CommonModule, FormEmpresaComponent, RouterLink],
  templateUrl: './empresa-lista.component.html',
  styleUrl: './empresa-lista.component.css'
})
export class EmpresaListaComponent {
  service = inject(EmpresaService);
  router = inject(Router);
  authService = inject(AuthService);

  array: Iempresa[] = [];
  showForm: boolean = false;
  empresaSeleccionada: Iempresa | null = null;
  rol: string = '';

  constructor() {
    this.array = [];
  }

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.service.getAll().subscribe((response) => {
      this.array = response;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.empresaSeleccionada = null;
    }
  }

  editarEmpresa(empresa: Iempresa) {
    this.router.navigate(['/empresas', empresa.idEmpresa, 'editar']);
  }

  eliminarEmpresa(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta empresa? Esta acción no se puede deshacer.')) {
      this.service.borrar(id.toString()).subscribe({
        next: () => {
          this.array = this.array.filter(empresa => empresa.idEmpresa !== id);
          console.log('Empresa eliminada correctamente');
          alert('Empresa eliminada correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar la empresa:', error);
          if (error.status === 404) {
            alert('La empresa no existe o ya ha sido eliminada');
          } else if (error.status === 409) {
            alert('No se puede eliminar la empresa porque tiene vacantes asociadas');
          } else {
            alert('Error al eliminar la empresa. Por favor, inténtelo de nuevo.');
          }
        }
      });
    }
  }

  verDetalles(id: number) {
    this.router.navigate(['/empresa', id]);
  }

  enviarCV(empresaId: number) {
    // Lógica para enviar CV
    console.log('Enviando CV a la empresa:', empresaId);
  }

  verEstadoSolicitud(empresaId: number) {
    // Lógica para ver estado de solicitud
    console.log('Ver estado de solicitud para empresa:', empresaId);
  }

  cancelarSolicitud(empresaId: number) {
    // Lógica para cancelar solicitud
    console.log('Cancelando solicitud para empresa:', empresaId);
  }

  modificarDatos(empresaId: number) {
    // Lógica para modificar datos
    console.log('Modificando datos de la empresa:', empresaId);
  }

  handleSubmit(data: { empresa: Iempresa, usuario: IUsuario }) {
    if (this.empresaSeleccionada) {
      // Modificar empresa existente
      this.service.modificar(this.empresaSeleccionada.idEmpresa.toString(), data.empresa).subscribe({
        next: (response) => {
          const index = this.array.findIndex(e => e.idEmpresa === this.empresaSeleccionada?.idEmpresa);
          if (index !== -1) {
            this.array[index] = { ...this.array[index], ...data.empresa };
          }
          this.toggleForm();
          console.log('Empresa actualizada correctamente');
        },
        error: (error) => {
          console.error('Error al modificar la empresa:', error);
          alert('Error al modificar la empresa. Por favor, inténtelo de nuevo.');
        }
      });
    } else {
      // Crear nueva empresa
      this.service.nuevo(data).subscribe({
        next: (response) => {
          this.array.push(response);
          this.toggleForm();
          console.log('Empresa creada correctamente');
        },
        error: (error) => {
          console.error('Error al crear la empresa:', error);
          alert('Error al crear la empresa. Por favor, inténtelo de nuevo.');
        }
      });
    }
  }
}
