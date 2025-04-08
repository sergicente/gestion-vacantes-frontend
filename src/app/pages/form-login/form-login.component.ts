import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-login',
  imports: [],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  credentials = { email: '', password: '' };
  loggedInMessage = false;

  constructor(
    private HttpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(event: Event) {
    event.preventDefault();

    this.HttpClient
      .post<any>('http://localhost:9001/api/usuarios/login', this.credentials)
      .subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          this.authService.setUser({ email: response.email }); // Guarda el usuario
          this.loggedInMessage = true;

          // Mostrar el mensaje por 5 segundos antes de redirigir
          setTimeout(() => {
            this.loggedInMessage = false;
            this.router.navigate(['/home']); // Redirección después del mensaje
          }, 5000);
        },
        (error) => {
          console.error('Error en el login:', error);
          this.loggedInMessage = false;
        }
      );
  }

  updateField(field: 'email' | 'password', event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.credentials[field] = inputElement.value;
    }
  }
}
