import { FormsModule, NgForm } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-login',
  imports: [FormsModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  updateField(arg0: string, $event: Event) {
    throw new Error('Method not implemented.');
  }
  credentials = { email: '', password: '' };
  loggedInMessage = false;

  usuarioService = inject(UsuarioService);
  router = inject(Router);

  ngOnInit(): void {
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/dashboard']);
    }


  }

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

  async login(loginForm: NgForm) {
    const datosUsuario: IUsuario = loginForm.value as IUsuario;

    try {
      const usuario = await this.usuarioService.login(datosUsuario);

      // Guardamos el usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      loginForm.reset();
      this.router.navigate(['/dashboard']);

      // Toast de éxito
      this.toast.fire({
        icon: 'success',
        title: 'Has iniciado sesión'
      });
    }  catch (error: any) {
      if (error.status === 403) {
        this.toast.fire({
          icon: 'error',
          title: 'Tu usuario está deshabilitado'
        });
      } else if (error.status === 401) {
        this.toast.fire({
          icon: 'error',
          title: 'Email o contraseña incorrectos'
        });
      } else {
        this.toast.fire({
          icon: 'error',
          title: 'Error inesperado al iniciar sesión'
        });
      }
    }
  }
}

