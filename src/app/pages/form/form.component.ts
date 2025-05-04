// form.component.ts
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VacanteService } from '../../services/vacante.service';
import { CategoriaService } from '../../services/categoria.service';
import { Ivacante } from '../../interfaces/ivacante';
import { Icategoria } from '../../interfaces/icategoria';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  router = inject(Router);
  vacanteService = inject(VacanteService);
  categoriaService = inject(CategoriaService);
  activatedRoute = inject(ActivatedRoute);

  form: FormGroup;
  tipo: string = 'Insertar';
  arrCategorias: Icategoria[] = [];
  destacado: boolean = false;

  constructor() {
    const empresa = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.categoriaService.getAll().subscribe((data: any) => {
      this.arrCategorias = data;
    });

    this.form = new FormGroup({
      idVacante: new FormControl(null),
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(130),
      ]),
      fecha: new FormControl(new Date().toISOString().split('T')[0]),
      salario: new FormControl(null, [Validators.required]),
      estado: new FormControl('ACTIVA', [Validators.required]),
      destacado: new FormControl(false),
      detalles: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(130),
      ]),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i),
      ]),
      idCategoria: new FormControl(null, [Validators.required]),
      idEmpresa: new FormControl(empresa.idEmpresa, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.tipo = 'Actualizar';
        this.vacanteService
          .getById(params.id)
          .subscribe((vacanteResponse: Ivacante) => {
            console.log(vacanteResponse);
            this.destacado = Number(vacanteResponse.destacado) === 0;
            this.form.patchValue({
              ...vacanteResponse,
              fecha: new Date().toISOString().split('T')[0],
            });
          });
      }
    });
  }

  submitVacante() {
    if (this.form.valid) {
      const formValue = this.form.value;
      formValue.destacado = formValue.destacado ? 1 : 0;
      if (typeof formValue.idCategoria === 'object' && formValue.idCategoria !== null) {
        formValue.idCategoria = formValue.idCategoria.idCategoria;
      }
  
      if (typeof formValue.idEmpresa === 'object' && formValue.idEmpresa !== null) {
        formValue.idEmpresa = formValue.idEmpresa.idEmpresa;
      }
  
      // Elimina posibles campos anidados no necesarios:
      delete formValue.categoria;
      delete formValue.empresa;
      const vacante: Ivacante = { ...formValue };

      if (this.tipo === 'Actualizar') {
        this.vacanteService.updateVacante(vacante).subscribe({
          next: () => {
            alert('Vacante actualizada');
            this.router.navigate(['/home']);
          },
          error: (err) => console.error(err),
        });
      } else {
        this.vacanteService.insertVacante(vacante).subscribe({
          next: () => {
            alert('Vacante añadida');
            this.router.navigate(['/home']);
          },
          error: (err) => console.error(err),
        });
      }   } else {
        alert('Por favor, selecciona una categoría válida.');
    }
  }

  checkControl(
    FormControlName: string,
    validators: string
  ): boolean | undefined {
    return (
      this.form.get(FormControlName)?.hasError(validators) &&
      this.form.get(FormControlName)?.touched
    );
  }
}
