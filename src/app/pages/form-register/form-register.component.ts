import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  onRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      alert('⚠️ Por favor, completa correctamente todos los campos.');
      registerForm.control.markAllAsTouched();
      return;
    }

    const usuarioCompleto = {
      ...this.user,
      enabled: 1,
      rol: 'CLIENTE',
      fechaRegistro: new Date().toISOString().slice(0, 10)
    };

    this.usuarioService.nuevo(usuarioCompleto).subscribe({
      next: res => {
        console.log('✅ Usuario registrado:', res);
        alert('Usuario registrado con éxito 🎉');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('❌ Error en el registro:', err);
        alert('Error al registrar usuario.');
      }
    });
  }
}
