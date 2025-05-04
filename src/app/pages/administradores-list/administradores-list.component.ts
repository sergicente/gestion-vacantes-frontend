import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administradores-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administradores-list.component.html',
  styleUrls: ['./administradores-list.component.css']
})
export class AdministradoresListComponent implements OnInit {
  administradores: any[] = [];
  rol: string = '';
  showForm: boolean = false;
  administradorSeleccionado: any = null;
  administradorForm: any = {
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    rol: 'ADMON',
    enabled: true
  };
  usuarioService = inject(UsuarioService);
  authService = inject(AuthService);
  router = inject(Router);

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  ngOnInit() {
    this.rol = this.authService.getRol();
    if (this.rol === 'ADMON') {
      this.loadAdministradores();
    } else {
      this.router.navigate(['/']);
    }
  }

  loadAdministradores() {
    this.usuarioService.getAll().subscribe({
      next: (response) => {
        this.administradores = response.filter((user: any) => user.rol === 'ADMON');
      },
      error: (error) => {
        console.error('Error al cargar administradores:', error);
        this.toast.fire({ icon: 'error', title: 'Error al cargar administradores' });
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.administradorSeleccionado = null;
      this.administradorForm = {
        email: '',
        password: '',
        nombre: '',
        apellidos: '',
        rol: 'ADMON',
        enabled: true
      };
    }
  }

  editarAdministrador(admin: any) {
    this.administradorSeleccionado = admin;
    this.administradorForm = {
      email: admin.email,
      password: '',
      nombre: admin.nombre,
      apellidos: admin.apellidos,
      rol: 'ADMON'
    };
    this.showForm = true;
  }

  eliminarAdministrador(email: string) {
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
        this.usuarioService.borrar(email).subscribe({
          next: () => {
            this.loadAdministradores();
            this.toast.fire({ icon: 'success', title: 'Administrador eliminado correctamente' });
          },
          error: (error) => {
            console.error('Error al eliminar administrador:', error);
            this.toast.fire({ icon: 'error', title: 'Error al eliminar administrador' });
          }
        });
      }
    });
  }

  handleSubmit(formData: any) {
    if (!formData.email || !formData.nombre || !formData.apellidos || (!this.administradorSeleccionado && !formData.password)) {
      this.toast.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos obligatorios.'
      });
      return;
    }

    if (this.administradorSeleccionado) {
      const datosActualizados = {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        rol: 'ADMON'
      };

      this.usuarioService.modificar(this.administradorSeleccionado.email, datosActualizados).subscribe({
        next: () => {
          this.loadAdministradores();
          this.toggleForm();
          this.toast.fire({ icon: 'success', title: 'Administrador actualizado correctamente' });
        },
        error: (error) => {
          console.error('Error al actualizar administrador:', error);
          this.toast.fire({ icon: 'error', title: 'Error al actualizar administrador' });
        }
      });
    } else {
      const nuevoAdministrador = {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        rol: 'ADMON',
        enabled: 1
      };

      this.usuarioService.nuevo(nuevoAdministrador).subscribe({
        next: () => {
          this.loadAdministradores();
          this.toggleForm();
          this.toast.fire({ icon: 'success', title: 'Administrador creado correctamente' });
        },
        error: (error) => {
          console.error('Error al crear administrador:', error);
          this.toast.fire({ icon: 'error', title: 'Error al crear administrador' });
        }
      });
    }
  }

  verDetalles(email: string) {
    this.router.navigate(['/administrador', email]);
  }
}
