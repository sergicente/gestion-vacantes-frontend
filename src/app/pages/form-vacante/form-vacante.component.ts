import { Iempresa } from './../../interfaces/iempresa';
import { EmpresaService } from '../../services/empresa.service';
import { VacanteService } from '../../services/vacante.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ivacante } from '../../interfaces/ivacante';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Icategoria } from '../../interfaces/icategoria';
import { NgForOf } from '@angular/common';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './form-vacante.component.html',
  styleUrl: './form-vacante.component.css'
})
export class FormVacanteComponent {

  router = inject(Router);
  vacanteService = inject(VacanteService);
  categoriaService = inject(CategoriaService);
  activatedRoute = inject(ActivatedRoute);
  empresaService = inject(EmpresaService);

  form: FormGroup;
  tipo: string;
  arrCategorias: Icategoria[];
  arrEmpresa: Iempresa[];
  empresa: any = {};
  isNewObject: boolean = true;


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

  constructor() {
    this.arrCategorias = [];

    this.categoriaService.getAll().subscribe((data: any) => {
      this.arrCategorias = data;
    });

    this.arrEmpresa = [];
    this.empresaService.getAll().subscribe((data: any) => {
      this.arrEmpresa = data;

      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      const empresaUsuario = this.arrEmpresa.find((emp) => emp.email === usuario.email);

      if (empresaUsuario) {
        this.form.get('idEmpresa')?.setValue(empresaUsuario.idEmpresa);
      }
    });

    this.tipo = "Insertar";
    this.form = new FormGroup({
      idVacante: new FormControl(null, []),
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]),
      fecha: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
      salario: new FormControl(null, [Validators.required]),
      estatus: new FormControl(null,),
      destacado: new FormControl('', [Validators.required]),
      detalles: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]),
      imagen: new FormControl(null, [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
      idCategoria: new FormControl(null, [Validators.required]),
      idEmpresa: new FormControl(null, [Validators.required])
    }, {});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = "Actualizar"
        this.vacanteService.getById(params.id).subscribe((response) => {
          const vacanteResponse: any = response;

          this.form.patchValue({
            idVacante: vacanteResponse.idVacante,
            nombre: vacanteResponse.nombre,
            descripcion: vacanteResponse.descripcion,
            fecha: vacanteResponse.fecha,
            salario: vacanteResponse.salario,
            destacado: vacanteResponse.destacado ? 1 : 0,
            detalles: vacanteResponse.detalles,
            imagen: vacanteResponse.imagen,
            idCategoria: vacanteResponse.categoria.idCategoria,
            // idEmpresa: vacanteResponse.idEmpresa,
            estatus: 'CREADA'
          });
        });
      }
    });
  }

  submitVacante() {
    // Obtén el valor real del idEmpresa, aunque esté deshabilitado
    const idEmpresa = this.form.get('idEmpresa')?.value;

    // Usa getRawValue() para obtener todo el formulario
    let vacante: Ivacante = this.form.getRawValue();

    // Asegúrate de añadir idEmpresa manualmente si no está
    vacante.idEmpresa = idEmpresa;

    console.log('Formulario antes de la actualización:', vacante);

    if (this.form.valid) {
      if (this.tipo === "Actualizar") {
        console.log('Actualizando');
        this.vacanteService.updateVacante(vacante)
          .then((_response: any): void => {
            // Toast de éxito
            this.toast.fire({
              icon: 'success',
              title: 'Vacante actualizada con éxito'
            });
            this.router.navigate(['/mis-vacantes']);
          })
          .catch((error: any): void => {
            console.error(error);
            // Toast de error
            this.toast.fire({
              icon: 'error',
              title: 'Error al actualizar la vacante'
            });
          });
      } else {
        console.log('Insertando');
        this.vacanteService.insertVacante(vacante)
          .then((_response: any): void => {
                        // Toast de éxito
                        this.toast.fire({
                          icon: 'success',
                          title: 'Vacante creada con éxito'
                        });
            this.router.navigate(['/mis-vacantes']);
          })
          .catch((error: any): void => {
            // Toast de error
            this.toast.fire({
              icon: 'error',
              title: 'Error al crear la vacante'
            });
          });
      }
    }
  }

  checkControl(FormControlName: string, validators: string): boolean | undefined {
    return this.form.get(FormControlName)?.hasError(validators) && this.form.get(FormControlName)?.touched;
  }
}
