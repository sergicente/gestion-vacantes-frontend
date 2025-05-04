import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Router, RouterLink } from '@angular/router';
import { Iempresa } from '../../interfaces/iempresa';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AltaEmpresaComponent } from "../alta-empresa/alta-empresa.component";
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-empresa-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, AltaEmpresaComponent],
  templateUrl: './empresa-lista.component.html',
  styleUrl: './empresa-lista.component.css'
})
export class EmpresaListaComponent {
  empresaService = inject(EmpresaService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  authService = inject(AuthService);

  array: Iempresa[] = [];
  showForm: boolean = false;
  empresaSeleccionada: Iempresa | null = null;
  rol: string = '';


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

  constructor() {
    this.array = [];
  }

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresaService.getAll().subscribe((response) => {
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.borrar(id.toString()).subscribe({
          next: () => {
            this.array = this.array.filter(empresa => empresa.idEmpresa !== id);
            console.log('Empresa eliminada correctamente');
            this.toast.fire({
              icon: 'success',
              title: 'Empresa eliminada correctamente'
            });
          },
          error: (error) => {
            console.error('Error al eliminar la empresa:', error);
            if (error.status === 404) {
              this.toast.fire({
                icon: 'error',
                title: 'La empresa no existe o ya ha sido eliminada'
              });
            } else if (error.status === 409) {
              this.toast.fire({
                icon: 'error',
                title: 'No se puede eliminar la empresa porque tiene vacantes asociadas'
              });
            } else {
              this.toast.fire({
                icon: 'error',
                title: 'Error al eliminar la empresa. Por favor, inténtelo de nuevo.'
              });
            }
          }
        });
      }
    });
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

  handleSubmit(empresa: Iempresa) {
    if (this.empresaSeleccionada) {
      // EDITAR empresa existente
      this.empresaService.modificar(this.empresaSeleccionada.idEmpresa.toString(), empresa).subscribe({
        next: () => {
          const index = this.array.findIndex(e => e.idEmpresa === this.empresaSeleccionada?.idEmpresa);
          if (index !== -1) {
            this.array[index] = { ...this.array[index], ...empresa };
          }
          this.resetForm();
          console.log('Empresa actualizada correctamente');
          this.toast.fire({
            icon: 'success',
            title: 'Empresa actualizada correctamente'
          });
        },
        error: (error) => {
          console.error('Error al modificar la empresa:', error);
          this.toast.fire({
            icon: 'error',
            title: 'Error al modificar la empresa. Por favor, inténtelo de nuevo.'
          });
        }
      });
    } else {
      // CREAR empresa nueva
      this.empresaService.crearEmpresaConUsuario(empresa).subscribe({
        next: (response) => {
          this.array.push(response.empresa); // si el backend responde con {empresa, password}
          this.resetForm();
          console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Empresa creada correctamente',
              html: `Usuario:  <strong> ${response.usuarioEmail}</strong><br>Contraseña : <strong> ${response.passwordGenerada}</strong>`
            });
          

        },
        error: (error) => {
          console.error('Error al crear la empresa:', error);
          this.toast.fire({
            icon: 'error',
            title: 'Error al crear la empresa. Por favor, inténtelo de nuevo.'
          });
          // el catchError del servicio ya muestra alerta
        }
      });
    }
  }

  resetForm() {
    this.showForm = false;
    this.empresaSeleccionada = null;
  }

  cancelarEdicion() {
    this.showForm = false;
    this.empresaSeleccionada = null;
    this.toast.fire({
      icon: 'info',
      title: 'Edición cancelada'
    });
  }
}
