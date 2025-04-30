import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
        // Habilitar administradores deshabilitados
        this.administradores.forEach(admin => {
          if (!admin.enabled) {
            this.usuarioService.habilitarUsuario(admin).then(() => {
              admin.enabled = true;
              console.log(`Administrador ${admin.email} habilitado`);
            }).catch((error) => {
              console.error(`Error al habilitar administrador ${admin.email}:`, error);
            });
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar administradores:', error);
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
      password: admin.password,
      nombre: admin.nombre,
      apellidos: admin.apellidos,
      rol: 'ADMON'
    };
    this.showForm = true;
  }

  eliminarAdministrador(email: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este administrador?')) {
      this.usuarioService.borrar(email).subscribe({
        next: () => {
          this.loadAdministradores();
          alert('Administrador eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar administrador:', error);
        }
      });
    }
  }

  handleSubmit(formData: any) {
    if (this.administradorSeleccionado) {
      // Actualizar
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
          alert('Administrador actualizado correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar administrador:', error);
        }
      });
    } else {
      // Crear nuevo
      const nuevoAdministrador = {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        rol: 'ADMON',
        enabled: 1  // Enviar como número en lugar de booleano
      };
      
      this.usuarioService.nuevo(nuevoAdministrador).subscribe({
        next: () => {
          this.loadAdministradores();
          this.toggleForm();
          alert('Administrador creado correctamente');
        },
        error: (error) => {
          console.error('Error al crear administrador:', error);
        }
      });
    }
  }

  verDetalles(email: string) {
    this.router.navigate(['/administrador', email]);
  }
} 