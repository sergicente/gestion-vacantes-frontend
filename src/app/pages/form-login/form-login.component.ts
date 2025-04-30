import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-login',
  standalone: true,
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

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
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
    if (loginForm.invalid) {
      alert('⚠️ Por favor, rellena todos los campos.');
      return;
    }

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
    } catch (error) {
      // Toast de error
      this.toast.fire({
        icon: 'error',
        title: 'Email o contraseña incorrectos'
      });
    }
  }
}
