import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { FormEmpresaComponent } from '../form-empresa/form-empresa.component';
import { Router } from '@angular/router';
import { Iempresa } from '../../interfaces/iempresa';
import { IUsuario } from '../../interfaces/iusuario';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empresa-lista',
  standalone: true,
  imports: [CommonModule, FormEmpresaComponent],
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
    this.empresaSeleccionada = empresa;
    this.showForm = true;
  }

  eliminarEmpresa(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
      this.service.borrar(id.toString()).subscribe({
        next: () => {
          this.loadEmpresas();
        },
        error: (error) => {
          console.error('Error al eliminar la empresa:', error);
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
        next: () => {
          this.loadEmpresas();
          this.toggleForm();
        },
        error: (error) => {
          console.error('Error al modificar la empresa:', error);
        }
      });
    } else {
      // Crear nueva empresa
      this.service.nuevo(data).subscribe({
        next: () => {
          this.loadEmpresas();
          this.toggleForm();
        },
        error: (error) => {
          console.error('Error al crear la empresa:', error);
        }
      });
    }
  }
}
