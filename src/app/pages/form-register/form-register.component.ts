import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  registeredMessage = false;
  servicio = inject(UsuarioService);
  router = inject(Router);

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
        // Toast de éxito
        this.toast.fire({
          icon: 'success',
          title: 'Cuenta registrada satisfactoriamente'
        });
        this.router.navigate(['/login']);
      },
      err => {
        // Toast de error
        this.toast.fire({
          icon: 'error',
          title: 'Error en el registro'
        });
        console.error('Error en el registro:', err);
      }
    );
  }
}
