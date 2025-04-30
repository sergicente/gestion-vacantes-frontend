import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  credentials: IUsuario = { email: '', password: '' } as IUsuario;

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.router.navigate(['/dashboard']);
    }
  }

  async login(loginForm: NgForm) {
    if (loginForm.invalid) {
      alert('⚠️ Por favor, rellena todos los campos.');
      return;
    }

    try {
      const usuario = await this.usuarioService.login(this.credentials).toPromise();
      
      console.log("🔐 Usuario logueado:", usuario);

      if (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));

        if (usuario.rol === 'EMPRESA' && usuario.idEmpresa) {
          localStorage.setItem('empresaId', usuario.idEmpresa.toString());
        } else {
          localStorage.removeItem('empresaId');
        }

        loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else {
        alert('❌ Error inesperado: respuesta vacía.');
      }

    } catch (error) {
      console.error('Error en login:', error);
      alert('❌ Email o contraseña incorrectos.');
    }
  }
}
