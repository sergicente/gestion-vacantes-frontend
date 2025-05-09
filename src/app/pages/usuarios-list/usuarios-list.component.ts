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

  // Método para cargar los usuarios
  loadUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (response) => {
        this.usuarios = response;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  // Método para habilitar o deshabilitar usuario con promesas
  async toggleEstadoUsuario(usuario: any) {
    const confirmMessage = usuario.enabled ? 
      '¿Estás seguro de que deseas deshabilitar este usuario?' : 
      '¿Estás seguro de que deseas habilitar este usuario?';

    if (confirm(confirmMessage)) {
      try {
        const action = usuario.enabled ? 
          this.usuarioService.deshabilitarUsuario(usuario.email) : 
          this.usuarioService.habilitarUsuario(usuario.email);
        
        // Esperar a que la promesa se resuelva
        await action;
        
        // Alternar el estado del usuario
        usuario.enabled = !usuario.enabled;

        const estado = usuario.enabled ? 'habilitado' : 'deshabilitado';
        alert(`Usuario ${estado} correctamente`);
      } catch (error) {
        console.error('Error al cambiar estado del usuario:', error);
        alert('Hubo un error al cambiar el estado del usuario.');
      }
    }
  }
}