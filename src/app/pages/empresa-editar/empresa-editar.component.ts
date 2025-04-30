import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-empresa-editar',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empresa-editar.component.html',
  styleUrls: ['./empresa-editar.component.css']
})
export class EmpresaEditarComponent implements OnInit {

  empresa = {
    idEmpresa: 0,
    cif: '',
    nombreEmpresa: '',
    direccionFiscal: '',
    pais: '',
    email: ''
  };

  constructor(
    private router: Router,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('empresaId');

    if (id) {
      this.empresaService.getById(id).subscribe({
        next: (data) => {
          console.log('Empresa cargada:', data);
          this.empresa = data;
        },
        error: (err) => {
          console.error('Error al obtener empresa:', err);
          alert('No se ha encontrado la empresa.');
        }
      });
    } else {
      console.warn('⚠️ No se encontró empresaId en localStorage');
    }
  }

  guardarCambios(): void {
    console.log('Guardando empresa:', this.empresa);
    this.empresaService.modificar(String(this.empresa.idEmpresa), this.empresa).subscribe({
      next: () => {
        alert('✅ Perfil actualizado correctamente');
        this.router.navigate(['/empresas']); // o al panel principal
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }
}
