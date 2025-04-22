import { FormsModule, NgForm } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-form-login',
  imports: [FormsModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  usuarioService = inject(UsuarioService);
  router = inject(Router);

  ngOnInit(): void {
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/dashboard']);
    }
  }

  async login(loginForm: NgForm) {
    const datosUsuario: IUsuario = loginForm.value as IUsuario;

    try {
      const usuario = await this.usuarioService.login(datosUsuario);

      // Guardamos el usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      loginForm.reset();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert('Email o contraseña incorrectos');
    }
  }
}