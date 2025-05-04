import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent implements OnInit {
  usuarios: any[] = [];
  rol: string = '';
  usuarioService = inject(UsuarioService);
  authService = inject(AuthService);

  ngOnInit() {
    this.rol = this.authService.getRol();
    if (this.rol === 'ADMON') {
      this.loadUsuarios();
    }
  }

  loadUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (response) => {
        this.usuarios = response.filter((user: any) => user.rol === 'CLIENTE');
        // Habilitar administradores deshabilitados
        this.usuarios.forEach(admin => {
          if (!admin.enabled) {
            this.usuarioService.habilitarUsuario(admin).subscribe({
              next: () => {
                admin.enabled = true;
                console.log(`Administrador ${admin.email} habilitado`);
              },
              error: (error) => {
                console.error(`Error al habilitar administrador ${admin.email}:`, error);
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar administradores:', error);
      }
    });
  }

  toggleEstadoUsuario(usuario: any) {
    const confirmMessage = usuario.enabled ? 
      '¿Estás seguro de que deseas deshabilitar este usuario?' : 
      '¿Estás seguro de que deseas habilitar este usuario?';

    if (confirm(confirmMessage)) {
      const action = usuario.enabled ? 
        this.usuarioService.deshabilitarUsuario(usuario) : 
        this.usuarioService.habilitarUsuario(usuario);

      action.subscribe({
        next: () => {
          usuario.enabled = !usuario.enabled;
          const estado = usuario.enabled ? 'habilitado' : 'deshabilitado';
          alert(`Usuario ${estado} correctamente`);
        },
        error: (error) => {
          console.error('Error al cambiar estado del usuario:', error);
        }
      });
    }
  }
} 