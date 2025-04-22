import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  user = {
    email: '',
    nombre: '',
    apellidos: '',
    password: ''
  };

  registeredMessage = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  updateField(field: keyof typeof this.user, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.user[field] = inputElement.value;
    }
  }

  onRegister(event: Event) {
    event.preventDefault();

    const usuarioCompleto = {
      ...this.user,
      enabled: 1,
      rol: 'CLIENTE',
      fechaRegistro: new Date().toISOString().slice(0, 10) // yyyy-MM-dd
    };

    this.http.post<any>('http://localhost:9001/api/usuarios/register', usuarioCompleto).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.authService.setUser({ email: this.user.email });
        this.registeredMessage = true;

        // Esperar 5 segundos antes de redirigir
        setTimeout(() => {
          this.registeredMessage = false;
          this.router.navigate(['/home']);
        }, 5000);
      },
      (error) => {
        console.error('Error en el registro:', error.error || error.message);
        alert('Error al registrar: ' + (error.error || 'Campos inválidos'));
      }
    );
  }
}
