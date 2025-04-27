import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alta-empresa',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './alta-empresa.component.html',
  styleUrl: './alta-empresa.component.css'
})
export class AltaEmpresaComponent {
  empresa = {
    nombre: '',
    direccion: '',
    email: '',
    telefono: ''
  };

  usuario = {
    nombre: '',
    email: ''
  };

  constructor(private empresaService: EmpresaService) {}

  // Función para manejar el submit del formulario
  onSubmit() {
    // Generar la contraseña aleatoria para el usuario
    const password = this.generateRandomPassword(10);

    // Preparar los datos para enviar al backend
    const formData = {
      empresa: this.empresa,
      usuario: {
        nombre: this.usuario.nombre,
        email: this.usuario.email,
        password: password, // Contraseña generada
        rol: 'EMPRESA' // Asignar rol "EMPRESA"
      }
    };

    // Registrar la empresa y usuario
    this.empresaService.crearEmpresaConUsuario(formData).subscribe(
      (response) => {
        console.log('Empresa registrada con éxito', response);
      },
      (error) => {
        console.error('Error al registrar la empresa', error);
      }
    );
  }

  // Función para generar una contraseña aleatoria
  generateRandomPassword(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }
}