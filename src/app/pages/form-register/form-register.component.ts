import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

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

  registeredMessage = false;
  servicio = inject(UsuarioService);
  router= inject(Router);



  onRegister(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const usuarioCompleto = {
      ...this.user,
      enabled: 1,
      rol: 'CLIENTE',
      fechaRegistro: new Date().toISOString().slice(0, 10)
    };
    this.servicio.nuevo(usuarioCompleto).subscribe(
      res => {
        console.log('Usuario registrado', res);
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Error en el registro:', err);
      }
    );
  }
}
