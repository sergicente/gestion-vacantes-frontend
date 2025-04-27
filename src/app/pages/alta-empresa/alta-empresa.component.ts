import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Iempresa } from '../../interfaces/iempresa';

@Component({
  selector: 'app-alta-empresa',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './alta-empresa.component.html',
  styleUrl: './alta-empresa.component.css'
})
export class AltaEmpresaComponent {
  empresa = {
    cif: '',
    nombreEmpresa: '',
    direccionFiscal: '',
    pais: '',
    email: ''
  };
  passwordGenerada: string | null = null;
  
 
  constructor(private empresaService: EmpresaService) {}

  // Método para enviar la solicitud y crear la empresa
  onSubmit(): void {
    this.empresaService.crearEmpresaConUsuario(this.empresa).subscribe(
      response => {
        console.log('Empresa creada:', response);
        this.passwordGenerada = response.password;  // Asumiendo que el backend responde con un campo 'password'
      },
      error => {
        console.error('Error al crear la empresa:', error);
        alert('Hubo un error al crear la empresa. Por favor, inténtelo de nuevo.');
      }
    );
  }
}