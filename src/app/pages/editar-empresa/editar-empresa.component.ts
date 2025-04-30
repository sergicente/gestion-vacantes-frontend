import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iempresa } from '../../interfaces/iempresa';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-empresa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {
  empresa: Iempresa = {
    idEmpresa: 0,
    cif: '',
    nombreEmpresa: '',
    direccionFiscal: '',
    pais: '',
    email: ''
  };

  empresaService = inject(EmpresaService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params.id;
      this.empresaService.getById(id).subscribe((empresa) => {
        this.empresa = empresa;
      });
    });
  }

  submitForm() {
    this.empresaService.modificar(this.empresa.idEmpresa.toString(), this.empresa).subscribe({
      next: () => {
        console.log('Empresa actualizada correctamente');
        this.router.navigate(['/empresas']);
      },
      error: (error) => {
        console.error('Error al actualizar la empresa:', error);
        alert('Error al actualizar la empresa. Por favor, inténtelo de nuevo.');
      }
    });
  }
} 