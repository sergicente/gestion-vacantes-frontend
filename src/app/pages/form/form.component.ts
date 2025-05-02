import { EmpresaService } from './../../services/empresa.service';
import { VacanteService } from './../../services/vacante.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ivacante } from '../../interfaces/ivacante';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Icategoria } from '../../interfaces/icategoria';
import { NgForOf } from '@angular/common';
import { Iempresa } from '../../interfaces/iempresa';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  router = inject(Router);
  vacanteService = inject(VacanteService);
  categoriaService = inject(CategoriaService);
  activatedRoute = inject(ActivatedRoute);
  empresaService = inject(EmpresaService);

  form: FormGroup;
  tipo: string;
  arrCategorias: Icategoria[];
  arrEmpresa: Iempresa[];

  isNewObject: boolean = true;

  constructor() {
    this.arrCategorias = [];
    this.categoriaService.getAll().subscribe((data: any) => {
      console.log(data);
      this.arrCategorias = data;
    });

    this.arrEmpresa = [];
    this.empresaService.getAll().subscribe((data: any) => {
      console.log(data);
      this.arrEmpresa = data;
    });

    this.tipo = "Insertar";
    this.form = new FormGroup({
      idVacante: new FormControl(null, []),
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]),
      fecha: new FormControl(null, [Validators.required]),
      salario: new FormControl(null, [Validators.required]),
      estado: new FormControl(null,),
      destacado: new FormControl(null, [Validators.required]),
      detalles: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]),
      imagen: new FormControl(null, [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
      idCategoria: new FormControl(null, [Validators.required]),
      idEmpresa: new FormControl(null, [Validators.required])
    }, {});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      console.log(params)
      if (params.id) {
        this.tipo = "Actualizar"
        this.vacanteService.getById(params.id).subscribe((response) => {
          const vacanteResponse: Ivacante = response;

          this.form = new FormGroup({
            idVacante: new FormControl(vacanteResponse.idVacante, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
            nombre: new FormControl(vacanteResponse.nombre, [Validators.required]),
            descripcion: new FormControl(vacanteResponse.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]),
            fecha: new FormControl(vacanteResponse.fecha, [Validators.required]),
            salario: new FormControl(vacanteResponse.salario, [Validators.required]),
            estado: new FormControl(vacanteResponse.estado, [Validators.required]),
            destacado: new FormControl(vacanteResponse.destacado, [Validators.required]),
            detalles: new FormControl(vacanteResponse.detalles, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]),
             imagen: new FormControl(vacanteResponse.imagen, [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
            idCategoria: new FormControl(vacanteResponse.idCategoria, [Validators.required]),
            idEmpresa: new FormControl(vacanteResponse.idEmpresa, [Validators.required])
          }, {});
        });
      }
    });
  }

  submitVacante() {
    if (this.form.valid) {
      console.log("Enviando formulario");
  
      const formValue = this.form.value;
  
      // Construye el objeto como lo espera el backend
      const vacante: Ivacante = {
        idVacante: formValue.idVacante,
        nombre: formValue.nombre,
        descripcion: formValue.descripcion,
        fecha: formValue.fecha,
        salario: formValue.salario,
        estado: formValue.estado, // <- este campo se llama "estatus" en el backend
        destacado: formValue.destacado,
        detalles: formValue.detalles,
        imagen: formValue.imagen,
        idCategoria: formValue.idCategoria,
        idEmpresa: formValue.idEmpresa
      };
  
      console.log("Vacante final a enviar:", vacante);
  
      if (this.tipo === "Actualizar") {
        this.vacanteService.updateVacante(vacante).subscribe({
          next: (response) => {
            alert(`Vacante ${response.idVacante} actualizada`);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            alert('Error al actualizar');
            console.error(err);
          }
        });
      } else {
        this.vacanteService.insertVacante(vacante).subscribe({
          next: (response) => {
            alert(`Vacante ${response.idVacante} añadida`);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            alert('Error al insertar la vacante');
            console.error(err);
          }
        });
      }
    }
  }
  

      
      
  checkControl(FormControlName: string, validators: string): boolean | undefined {
    return this.form.get(FormControlName)?.hasError(validators) && this.form.get(FormControlName)?.touched;
  }

  selectedFile: File | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  

}
