import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

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
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  toggleEstadoUsuario(usuario: any) {
    const accion = usuario.enabled ? 'Deshabilitar' : 'Habilitar';
  
    Swal.fire({
      title: `¿${accion} a ${usuario.nombre}?`,
      showCancelButton: true,
      confirmButtonText: accion,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const action = usuario.enabled
          ? this.usuarioService.deshabilitarUsuario(usuario)
          : this.usuarioService.habilitarUsuario(usuario);
  
        action.subscribe({
          next: () => {
            usuario.enabled = !usuario.enabled;
            this.toast.fire({
              icon: 'success',
              title: `Usuario ${usuario.enabled ? 'habilitado' : 'deshabilitado'}`
            });
          },
          error: (error) => {
            console.error('Error al cambiar estado del usuario:', error);
            this.toast.fire({
              icon: 'error',
              title: 'Error al cambiar estado'
            });
          }
        });
      }
    });
  }
} 